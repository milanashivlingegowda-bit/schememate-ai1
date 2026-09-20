import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  ShieldAlert,
  User,
  Bot,
  HelpCircle,
  Copy,
  Check,
  Building2,
  FileText,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ChatMessage, UserProfile, DemoScheme } from '../../types/scheme';
import { apiService } from '../../services/api';
import { DEMO_SCHEMES } from '../../data/demoSchemes';
import { Button } from '../common/Button';

interface AskSchemeMateProps {
  profile: UserProfile | null;
  activeSchemeContext?: DemoScheme | null;
  onClearActiveSchemeContext?: () => void;
  onViewSchemeDetails?: (schemeId: string) => void;
}

const SUGGESTED_PROMPTS = [
  'Which schemes are best for farmers?',
  'What documents do I need for student scholarships?',
  'Can women entrepreneurs get business loans?',
  'Are there schemes for small business credit with subsidies?',
  'How does health insurance under Ayushman Bharat work?'
];

export const AskSchemeMate: React.FC<AskSchemeMateProps> = ({
  profile,
  activeSchemeContext,
  onClearActiveSchemeContext,
  onViewSchemeDetails
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Namaste! I am **SchemeMate AI**, your citizen welfare discovery assistant.

You can ask me questions about government schemes, eligibility parameters, required documentation, and application procedures.

${activeSchemeContext ? `Currently focused on: **${activeSchemeContext.name}**` : 'How can I assist you today?'}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isSending) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsSending(true);

    try {
      const response = await apiService.askSchemeMate(
        query,
        profile,
        activeSchemeContext?.id
      );

      const botMessageId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMessageId,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        referencedSchemeIds: response.referencedSchemeIds
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to get answer:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I experienced a temporary glitch processing that query. You can ask again, or refer to the scheme directory in the Explore tab.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat conversation cleared. How can I assist you with government schemes and citizen benefits today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="ask-schememate-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Citizen Assistant</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Ask SchemeMate AI
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask questions regarding scheme eligibility, paperwork, and application steps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSchemeContext && (
            <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs px-2.5 py-1.5 rounded-lg">
              <span className="font-semibold truncate max-w-[140px]">
                {activeSchemeContext.name}
              </span>
              {onClearActiveSchemeContext && (
                <button
                  type="button"
                  onClick={onClearActiveSchemeContext}
                  className="text-indigo-400 hover:text-indigo-700 ml-1 cursor-pointer"
                  title="Remove scheme context"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <Button
            id="clear-chat-btn"
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Mandatory Prominent Notice */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          SchemeMate AI provides guidance based on available demo scheme descriptions. Always check official
          government notifications and ministry portals for final eligibility and legal guidelines.
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[560px]">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4" id="chat-messages-container">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-xs rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center justify-between gap-4 mb-1.5 opacity-80 text-[10px]">
                    <span className="font-semibold">{isUser ? 'You' : 'SchemeMate AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Content */}
                  <div className="space-y-2 whitespace-pre-line break-words">
                    {msg.text}
                  </div>

                  {/* Referenced Schemes Chips if available */}
                  {msg.referencedSchemeIds && msg.referencedSchemeIds.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-indigo-600" /> Mentioned Schemes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.referencedSchemeIds.map((schemeId: string, i: number) => {
                          const matchedScheme = DEMO_SCHEMES.find(s => s.id === schemeId);
                          const displayName = matchedScheme ? matchedScheme.name : schemeId;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => onViewSchemeDetails && onViewSchemeDetails(schemeId)}
                              className="inline-flex items-center gap-1 bg-white hover:bg-indigo-50 border border-indigo-200 hover:border-indigo-300 text-indigo-700 px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer transition-colors"
                              title="Click to view scheme details"
                            >
                              <span>{displayName}</span>
                              <ArrowRight className="w-2.5 h-2.5 text-indigo-500" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Message Tools for Assistant */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isSending && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 font-medium ml-1">
                  Synthesizing scheme parameters...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Shelf */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <HelpCircle className="w-3 h-3 text-indigo-500" /> Suggested:
            </span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                id={`suggested-prompt-${idx}`}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            id="chat-input-field"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your question about schemes, quotas, or documents..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white shadow-2xs"
            disabled={isSending}
          />

          <Button
            id="send-chat-btn"
            variant="primary"
            size="md"
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isSending}
            isLoading={isSending}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
