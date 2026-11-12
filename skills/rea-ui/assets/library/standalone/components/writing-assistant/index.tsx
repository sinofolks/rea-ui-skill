"use client";

import "./WritingAssistant.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
interface WritingAssistantProps {
  name?: string;
  tagline?: string;
  greeting?: string;
  suggestions?: string[];
  placeholder?: string;
  respond?: (message: string) => string | Promise<string>;
  speech?: "auto" | "simulate";
  dictation?: string;
  className?: string;
}
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}
interface RevealProgress {
  id: number;
  words: number;
}
interface RecognitionResult {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}
interface RecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: RecognitionResult;
  };
}
/** The supported part of the browser's optional speech recognition API. */
interface SpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
};
function WritingAssistant({
  name = "Quill",
  tagline = "Your writing companion.",
  greeting = "What should we write?",
  suggestions = ["Polish my email", "Make it shorter", "Fix the tone", "Draft a reply"],
  placeholder = "Ask anything…",
  respond,
  speech,
  dictation,
  className,
}: WritingAssistantProps) {
  const {
    messages,
    draft,
    setDraft,
    interimText,
    listening,
    sending,
    reveal,
    messageListRef,
    inputRef,
    hasMessages,
    sendMessage,
    submitMessage,
    startDictation,
    stopDictation,
    resetChat,
    displayMessage,
  } = useWritingAssistant({ respond, speech, dictation, inputMaxHeight: 103 });
  return (
    <div
      className={[`ui-wa`, className].filter(Boolean).join(` `)}
      data-chat={hasMessages ? `` : void 0}
    >
      <header className="ui-wa__head">
        <div className="ui-wa__id">
          <h3 className="ui-wa__name" title={name}>
            {name}
          </h3>
          <p className="ui-wa__tagline" title={tagline}>
            {tagline}
          </p>
        </div>
        <button
          type="button"
          className="ui-wa__new"
          aria-label="New chat"
          onClick={resetChat}
          tabIndex={hasMessages ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5.5v13M5.5 12h13" />
          </svg>
        </button>
      </header>
      <div className="ui-wa__panel">
        <div className="ui-wa__glow" aria-hidden="true">
          <span className="ui-wa__blob ui-wa__blob--pink" />
          <span className="ui-wa__blob ui-wa__blob--violet" />
          <span className="ui-wa__blob ui-wa__blob--blue" />
        </div>
        <div className="ui-wa__body">
          {hasMessages ? (
            <div className="ui-wa__messages" ref={messageListRef} aria-live="polite">
              {messages.map((message) => (
                <p
                  className={`ui-wa__msg ui-wa__msg--${message.role}`}
                  dir="auto"
                  children={displayMessage(message)}
                  key={message.id}
                />
              ))}
              {sending && !reveal && messages[messages.length - 1]?.role === `user` && (
                <p
                  className="ui-wa__msg ui-wa__msg--assistant ui-wa__typing"
                  aria-label="Writing"
                >
                  <i />
                  <i />
                  <i />
                </p>
              )}
            </div>
          ) : (
            <div className="ui-wa__welcome">
              <p className="ui-wa__greeting" dir="auto">
                {greeting}
              </p>
              {suggestions.length > 0 && (
                <div className="ui-wa__chips">
                  {suggestions.map((suggestion, index) => (
                    <button
                      type="button"
                      className="ui-wa__chip"
                      title={suggestion}
                      dir="auto"
                      onClick={() => sendMessage(suggestion)}
                      children={suggestion}
                      key={`${index}-${suggestion}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <form className="ui-wa__row" onSubmit={submitMessage}>
            <div className="ui-wa__field" data-listening={listening ? `` : void 0}>
              <textarea
                ref={inputRef}
                rows={1}
                value={listening ? interimText : draft}
                readOnly={listening}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === `Enter` &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    sendMessage(draft);
                  }
                }}
                placeholder={listening ? `Listening…` : placeholder}
                aria-label="Message"
                dir="auto"
              />
              {draft && !listening && (
                <button
                  type="submit"
                  className="ui-wa__send"
                  aria-label="Send"
                  disabled={sending}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 18.5v-13M6.5 11 12 5.5l5.5 5.5" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="button"
              className="ui-wa__mic"
              data-listening={listening ? `` : void 0}
              aria-pressed={listening}
              aria-label={listening ? `Stop dictation` : `Dictate`}
              onClick={listening ? stopDictation : startDictation}
              disabled={sending && !listening}
            >
              <span className="ui-wa__pulse" aria-hidden="true" />
              {listening ? (
                <span className="ui-wa__wave" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.5a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-5a3 3 0 0 1 3-3ZM6 11.5a6 6 0 0 0 12 0M12 17.5v3" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
function defaultResponse(message: string): string {
  const request = message.toLowerCase();
  if (request.includes("remind"))
    return "Hi team, just a friendly nudge: the report is due this Friday. If anything is holding you up, let me know today and we'll sort it out together. Thanks!";
  if (request.includes("shorter") || request.includes("short"))
    return "Here's a tighter version: “Thanks for the quick turnaround – the new draft reads much better. Let's ship it Friday.”";
  if (request.includes("tone"))
    return "I softened the opening and swapped the direct ask for a question, so it sounds friendly but still clear about the deadline.";
  if (request.includes("reply"))
    return "Hi Sam, thanks for the update! Thursday works for me – I'll bring the revised numbers so we can decide on the spot.";
  if (request.includes("email") || request.includes("polish"))
    return "I fixed two typos, split the long second paragraph and moved your main ask to the first line, so it's the first thing they read.";
  return "Got it. Here's a first draft – tell me if it should sound more formal, shorter or more playful, and I'll adjust it.";
}
function useWritingAssistant({
  respond = defaultResponse,
  speech = "auto",
  dictation = "Write a friendly reminder that the report is due on Friday",
  inputMaxHeight,
}: Pick<WritingAssistantProps, "respond" | "speech" | "dictation"> & {
  inputMaxHeight: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [interimText, setInterimText] = useState("");
  const [listening, setListening] = useState(false);
  const [sending, setSending] = useState(false);
  const [reveal, setReveal] = useState<RevealProgress | null>(null);
  const nextMessageId = useRef(1);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscript = useRef("");
  const timers = useRef<number[]>([]);
  function schedule(callback: () => void, delay: number) {
    timers.current.push(window.setTimeout(callback, delay));
  }
  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      recognitionRef.current?.abort();
    },
    [],
  );
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, inputMaxHeight)}px`;
    if (listening || document.activeElement !== input)
      input.scrollTop = input.scrollHeight;
  }, [draft, interimText, listening]);
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList?.scrollTo({
      top: messageList.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, reveal]);
  const hasMessages = messages.length > 0;
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    let previousHeight = messageList.clientHeight;
    const observer = new ResizeObserver(() => {
      if (messageList.clientHeight < previousHeight)
        messageList.scrollTop = messageList.scrollHeight;
      previousHeight = messageList.clientHeight;
    });
    observer.observe(messageList);
    return () => observer.disconnect();
  }, [hasMessages]);
  async function sendMessage(message: string) {
    const text = message.trim();
    if (!text || sending) return;
    setDraft("");
    setInterimText("");
    const userMessage: Message = {
      id: nextMessageId.current++,
      role: "user",
      text,
    };
    setMessages((previous) => [...previous, userMessage]);
    setSending(true);
    let reply: string;
    try {
      const [response] = await Promise.all([
        Promise.resolve(respond(text)),
        new Promise<void>((resolve) => schedule(resolve, 700)),
      ]);
      reply = typeof response === "string" ? response : String(response ?? "");
    } catch {
      reply = "Couldn't write a reply – try again.";
    }
    if (!reply.trim()) {
      setSending(false);
      return;
    }
    const replyId = nextMessageId.current++;
    setMessages((previous) => [
      ...previous,
      { id: replyId, role: "assistant", text: reply },
    ]);
    const wordCount = wordsOf(reply).length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || wordCount < 2) {
      setReveal(null);
      setSending(false);
      return;
    }
    let shownWords = 0;
    const interval = window.setInterval(() => {
      shownWords++;
      if (shownWords <= wordCount) {
        setReveal({ id: replyId, words: shownWords });
        return;
      }
      window.clearInterval(interval);
      setReveal(null);
      setSending(false);
    }, 38);
    timers.current.push(interval);
  }
  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }
  function finishDictation(text: string) {
    setListening(false);
    setInterimText("");
    if (text.trim()) {
      setDraft(text.trim());
      schedule(() => {
        void sendMessage(text);
      }, 450);
    }
  }
  function simulateDictation() {
    setListening(true);
    setDraft("");
    const words = dictation.split(/\s+/);
    words.forEach((_, index) =>
      schedule(
        () => setInterimText(words.slice(0, index + 1).join(" ")),
        260 + index * 170,
      ),
    );
    schedule(() => finishDictation(dictation), 260 + words.length * 170 + 500);
  }
  function startDictation() {
    if (sending) return;
    const speechWindow = window as SpeechWindow;
    const Recognition =
      speech === "auto"
        ? (speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition)
        : undefined;
    if (!Recognition) {
      simulateDictation();
      return;
    }
    const recognition = new Recognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    finalTranscript.current = "";
    recognition.onresult = (event) => {
      let interim = "";
      for (let index = event.resultIndex; index < event.results.length; index++) {
        const result = event.results[index];
        if (result.isFinal) finalTranscript.current += result[0].transcript;
        else interim += result[0].transcript;
      }
      setInterimText(`${finalTranscript.current}${interim}`);
    };
    recognition.onerror = (event) => {
      recognitionRef.current = null;
      if (["not-allowed", "service-not-allowed", "network"].includes(event.error))
        simulateDictation();
      else setListening(false);
    };
    recognition.onend = () => {
      if (recognitionRef.current !== recognition) return;
      recognitionRef.current = null;
      finishDictation(finalTranscript.current);
    };
    recognitionRef.current = recognition;
    setDraft("");
    setInterimText("");
    setListening(true);
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      simulateDictation();
    }
  }
  function stopDictation() {
    recognitionRef.current?.stop();
  }
  function resetChat() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setMessages([]);
    setDraft("");
    setInterimText("");
    setListening(false);
    setSending(false);
    setReveal(null);
  }
  const displayMessage = (message: Message) =>
    reveal?.id === message.id
      ? wordsOf(message.text).slice(0, reveal.words).join("")
      : message.text;
  return {
    messages,
    draft,
    setDraft,
    interimText,
    listening,
    sending,
    reveal,
    messageListRef,
    inputRef,
    hasMessages,
    sendMessage,
    submitMessage,
    startDictation,
    stopDictation,
    resetChat,
    displayMessage,
  };
}
const wordsOf = (text: string) => text.match(/\s*\S+\s*/g) ?? [];
export { WritingAssistant };
export type { WritingAssistantProps };
