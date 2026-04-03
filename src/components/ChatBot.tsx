'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { allChapters } from '@/lib/data/chapters';
import { allExercises } from '@/lib/data/exercises';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: { chapter: string; section: string }[];
}

// Build knowledge base from chapter data
function buildKnowledgeIndex() {
  const entries: { chapterId: string; chapterNum: number; title: string; section: string; content: string; keywords: string[] }[] = [];

  allChapters.forEach(ch => {
    // Chapter overview
    entries.push({
      chapterId: ch.id,
      chapterNum: ch.chapterNumber,
      title: ch.title,
      section: 'Tổng quan',
      content: ch.overview,
      keywords: [ch.title.toLowerCase(), ch.detectedTopic.toLowerCase()],
    });

    // Detailed sections
    ch.detailedSummary.forEach(sec => {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: sec.title,
        content: sec.content,
        keywords: extractKeywords(sec.content + ' ' + sec.title),
      });
    });

    // Key concepts
    ch.keyConcepts.forEach(kc => {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: `Khái niệm: ${kc.title}`,
        content: kc.description,
        keywords: extractKeywords(kc.title + ' ' + kc.description),
      });
    });

    // Formulas as knowledge
    ch.formulas.forEach(f => {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: `Công thức: ${f.name}`,
        content: `${f.name}: ${f.expression}. ${f.meaning}. ${f.usageContext}. Biến: ${f.variables.map(v => `${v.symbol} = ${v.name}${v.unit ? ` (${v.unit})` : ''}`).join(', ')}.`,
        keywords: extractKeywords(f.name + ' ' + f.meaning + ' ' + f.expression),
      });
    });

    // Common mistakes
    if (ch.commonMistakes.length > 0) {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: 'Lỗi thường gặp',
        content: ch.commonMistakes.join('\n'),
        keywords: ['lỗi', 'sai', 'nhầm', 'mistake'],
      });
    }

    // Important notes
    if (ch.importantNotes.length > 0) {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: 'Ghi chú quan trọng',
        content: ch.importantNotes.join('\n'),
        keywords: ['lưu ý', 'quan trọng', 'nhớ'],
      });
    }

    // Worked examples
    ch.workedExamples.forEach(ex => {
      entries.push({
        chapterId: ch.id,
        chapterNum: ch.chapterNumber,
        title: ch.title,
        section: `Ví dụ: ${ex.title}`,
        content: `Đề: ${ex.problem}\nLời giải: ${ex.solution}`,
        keywords: ['ví dụ', 'bài giải', ...extractKeywords(ex.title)],
      });
    });
  });

  // Exercises
  allExercises.forEach(ex => {
    const ch = allChapters.find(c => c.id === ex.chapterId);
    entries.push({
      chapterId: ex.chapterId,
      chapterNum: ch?.chapterNumber || 0,
      title: ch?.title || '',
      section: `Bài tập: ${ex.title}`,
      content: `Đề: ${ex.prompt}\nĐáp án: ${ex.answer || ''}\nLời giải: ${ex.solutionSteps?.join('; ') || ''}`,
      keywords: ['bài tập', ...extractKeywords(ex.prompt)],
    });
  });

  return entries;
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['và', 'của', 'là', 'có', 'trong', 'cho', 'với', 'được', 'này', 'các', 'một', 'khi', 'từ', 'theo', 'đến', 'tại', 'về', 'do', 'không', 'hay', 'đó', 'thì', 'cũng', 'như', 'hoặc', 'nếu', 'bằng', 'trên', 'dưới']);
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !stopWords.has(w))
    .slice(0, 30);
}

function searchKnowledge(query: string, topK = 5) {
  const index = buildKnowledgeIndex();
  const queryWords = extractKeywords(query);
  const queryLower = query.toLowerCase();

  // Score each entry
  const scored = index.map(entry => {
    let score = 0;

    // Keyword overlap
    queryWords.forEach(qw => {
      if (entry.keywords.some(kw => kw.includes(qw) || qw.includes(kw))) score += 3;
      if (entry.content.toLowerCase().includes(qw)) score += 2;
      if (entry.section.toLowerCase().includes(qw)) score += 4;
      if (entry.title.toLowerCase().includes(qw)) score += 2;
    });

    // Direct phrase match bonus
    if (entry.content.toLowerCase().includes(queryLower)) score += 10;
    if (entry.section.toLowerCase().includes(queryLower)) score += 15;

    // Chapter number match (user might say "chương 3")
    const chNumMatch = query.match(/ch(?:ương|\.?\s*)\s*(\d)/i);
    if (chNumMatch && parseInt(chNumMatch[1]) === entry.chapterNum) score += 8;

    return { ...entry, score };
  });

  return scored
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function generateAnswer(query: string, results: ReturnType<typeof searchKnowledge>): { answer: string; sources: ChatMessage['sources'] } {
  if (results.length === 0) {
    return {
      answer: 'Xin lỗi, tôi không tìm thấy thông tin liên quan trong tài liệu. Bạn có thể thử hỏi cụ thể hơn về một chương hoặc khái niệm cụ thể?',
      sources: [],
    };
  }

  const topResult = results[0];
  const queryLower = query.toLowerCase();

  // Check if asking about a formula
  const isFormulaQ = queryLower.includes('công thức') || queryLower.includes('tính') || queryLower.includes('formula') || queryLower.includes('cách tính');

  // Check if asking about a concept
  const isConceptQ = queryLower.includes('là gì') || queryLower.includes('giải thích') || queryLower.includes('thế nào') || queryLower.includes('khái niệm');

  // Check if asking about exercise
  const isExerciseQ = queryLower.includes('bài tập') || queryLower.includes('ví dụ') || queryLower.includes('giải bài');

  // Check if asking about mistakes
  const isMistakeQ = queryLower.includes('lỗi') || queryLower.includes('sai') || queryLower.includes('nhầm');

  let answerParts: string[] = [];

  // Context header
  answerParts.push(`📚 **Chương ${topResult.chapterNum}: ${topResult.title}**`);
  answerParts.push(`📌 *${topResult.section}*\n`);

  if (isFormulaQ) {
    // Find formula-specific results
    const formulaResults = results.filter(r => r.section.startsWith('Công thức:'));
    if (formulaResults.length > 0) {
      formulaResults.forEach(fr => {
        answerParts.push(`**${fr.section}**`);
        answerParts.push(fr.content);
        answerParts.push('');
      });
    } else {
      answerParts.push(topResult.content);
    }
  } else if (isExerciseQ) {
    const exerciseResults = results.filter(r => r.section.startsWith('Bài tập:') || r.section.startsWith('Ví dụ:'));
    if (exerciseResults.length > 0) {
      exerciseResults.slice(0, 2).forEach(er => {
        answerParts.push(`**${er.section}**`);
        answerParts.push(er.content);
        answerParts.push('');
      });
    } else {
      answerParts.push(topResult.content);
    }
  } else if (isMistakeQ) {
    const mistakeResults = results.filter(r => r.section.includes('Lỗi'));
    if (mistakeResults.length > 0) {
      answerParts.push('⚠️ **Các lỗi thường gặp:**\n');
      mistakeResults.forEach(mr => answerParts.push(mr.content));
    } else {
      answerParts.push(topResult.content);
    }
  } else {
    // General answer — combine top results
    answerParts.push(topResult.content);

    if (results.length > 1 && results[1].score > results[0].score * 0.5) {
      answerParts.push(`\n---\n📎 **Thông tin bổ sung (${results[1].section}):**`);
      // Truncate if too long
      const extra = results[1].content;
      answerParts.push(extra.length > 400 ? extra.substring(0, 400) + '...' : extra);
    }
  }

  const sources = results.slice(0, 3).map(r => ({
    chapter: `Chương ${r.chapterNum}`,
    section: r.section,
  }));

  return {
    answer: answerParts.join('\n'),
    sources,
  };
}

// Suggested questions
const suggestedQuestions = [
  'Hệ số rỗng e là gì?',
  'Công thức tính sức chịu tải theo Terzaghi?',
  'Phân loại đất dính theo chỉ số dẻo IP?',
  'Giải thích ứng suất bản thân?',
  'Lỗi thường gặp khi tính lún?',
  'Cách tính áp lực đất chủ động?',
  'Ví dụ tính γk từ γ và W?',
  'Giới hạn Atterberg là gì?',
];

export function ChatbotModule() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Xin chào! Tôi là **Trợ lý Cơ Học Đất**, sẵn sàng giải đáp các câu hỏi về kiến thức từ 7 chương của môn Cơ học đất.\n\nBạn có thể hỏi về:\n- 📖 Khái niệm, định nghĩa\n- 🔢 Công thức và cách tính\n- 📝 Bài tập và ví dụ\n- ⚠️ Lỗi thường gặp\n\nHãy thử hỏi tôi nhé!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate "thinking" delay
    await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

    // Search knowledge base
    const results = searchKnowledge(messageText);
    const { answer, sources } = generateAnswer(messageText, results);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: 'assistant',
      content: answer,
      timestamp: new Date(),
      sources,
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);

    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome-new',
      role: 'assistant',
      content: '🔄 Cuộc trò chuyện đã được làm mới. Hãy hỏi tôi bất cứ điều gì về Cơ Học Đất!',
      timestamp: new Date(),
    }]);
  };

  // Render markdown-like content
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold
      let rendered = line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
      // Italic
      rendered = rendered.replace(/\*([^*]+)\*/g, '<em class="text-dark-300">$1</em>');
      // Inline code
      rendered = rendered.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-white/5 text-cyan-300 text-xs font-mono">$1</code>');
      // Horizontal rule
      if (rendered.trim() === '---') {
        return <hr key={i} className="border-white/5 my-2" />;
      }
      // Bullet points
      if (rendered.startsWith('- ')) {
        return <p key={i} className="pl-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: '• ' + rendered.substring(2) }} />;
      }

      return rendered.trim() ? (
        <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: rendered }} />
      ) : (
        <br key={i} />
      );
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-dark-800 border border-white/10 rotate-0'
            : 'bg-gradient-to-br from-primary-600 to-purple-600 hover:shadow-primary-600/30'
        }`}
        title="Trợ lý Cơ Học Đất"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <>
            <span className="text-2xl">💬</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">
                {unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in"
          style={{ background: 'rgba(15, 15, 30, 0.95)', backdropFilter: 'blur(20px)' }}>

          {/* Header */}
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(59, 143, 246, 0.1), rgba(168, 85, 247, 0.1))' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-lg shadow-lg">
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Trợ lý Cơ Học Đất</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-dark-400">Dựa trên tài liệu giáo trình</span>
                </div>
              </div>
            </div>
            <button onClick={clearChat} className="text-dark-400 hover:text-white text-xs transition-colors px-2 py-1 rounded-lg hover:bg-white/5" title="Làm mới">
              🔄
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-br-sm'
                    : 'bg-white/[0.04] border border-white/[0.06] text-dark-200 rounded-bl-sm'
                }`}>
                  <div className="space-y-1">
                    {renderContent(msg.content)}
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <p className="text-[10px] text-dark-500 mb-1">📎 Nguồn tham khảo:</p>
                      {msg.sources.map((s, i) => (
                        <span key={i} className="inline-block mr-1 mb-1 px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-dark-400">
                          {s.chapter} — {s.section}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/40' : 'text-dark-500'}`}>
                    {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 shrink-0">
              <p className="text-[10px] text-dark-500 mb-1.5">💡 Câu hỏi gợi ý:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.slice(0, 4).map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.03] border border-white/[0.06] text-dark-300 hover:bg-white/[0.06] hover:text-white transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/5 shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về Cơ Học Đất..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-500"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-40 shrink-0"
              >
                📤
              </button>
            </div>
            <p className="text-[10px] text-dark-600 mt-1.5 text-center">
              Trả lời dựa trên nội dung giáo trình Cơ Học Đất UTC
            </p>
          </div>
        </div>
      )}
    </>
  );
}
