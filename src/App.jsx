import { useState, useEffect, useRef } from "react";

const concepts = [
  {
    id: 1,
    emoji: "🌐",
    title: "What is a Network?",
    tag: "Day ",
    color: "#7C5CFC",
    watch: "search: 'what is a computer network NetworkChuck'",
    tldr: "A network is just devices talking to each other. Your phone, laptop, router — they're all in a network right now.",
    whyItMatters: "Without networks, the internet doesn't exist. Every app, every website, every Zoom call is just devices exchanging data across a network.",
    analogy: "Think of it like a group chat. Each person is a device. The chat app is the network. The messages are data packets.",
    distinctionAnswer: "A network enables resource sharing and communication between devices by establishing agreed-upon rules (protocols) for how data is formatted, addressed, and transmitted — without these rules, devices couldn't understand each other even if physically connected.",
    quiz: [
      { q: "What is the main purpose of a computer network?", options: ["Store files", "Connect devices so they can communicate", "Run apps faster", "Save battery"], answer: 1 },
      { q: "Which of these is an example of a network?", options: ["A single laptop with no wifi", "Your phone connected to home wifi", "A USB drive", "A keyboard"], answer: 1 },
      { q: "What are the 'rules' that devices use to communicate called?", options: ["Drivers", "Protocols", "Networks", "IP Addresses"], answer: 1 },
    ]
  },
  {
    id: 2,
    emoji: "🏠",
    title: "What is an IP Address?",
    tag: "Day 2",
    color: "#E8547A",
    watch: "search: 'IP address explained simply NetworkChuck'",
    tldr: "An IP address is your device's home address on a network. Every device needs one to send or receive data.",
    whyItMatters: "Without IP addresses, data has no way of knowing where to go. It's how the internet routes millions of messages to the right devices.",
    analogy: "If the internet is a city, an IP address is your home address. You can't get mail delivered if you don't have one.",
    distinctionAnswer: "IP addresses serve a dual function: identification (who you are on the network) and location (where to send data). IPv4 gives ~4.3 billion addresses — which ran out, which is why IPv6 (with 340 undecillion addresses) was created.",
    quiz: [
      { q: "What does an IP address uniquely identify?", options: ["A username", "A device on a network", "A website", "A file"], answer: 1 },
      { q: "Why did we need IPv6?", options: ["IPv4 was too slow", "IPv4 addresses ran out", "IPv6 is cheaper", "IPv4 was insecure"], answer: 1 },
      { q: "Which looks like a valid IPv4 address?", options: ["google.com", "192.168.1.1", "HTTP://home", "00:1A:2B:3C"], answer: 1 },
    ]
  },
  {
    id: 3,
    emoji: "🧅",
    title: "The OSI Model",
    tag: "Day 3–4",
    color: "#F5A623",
    watch: "search: 'OSI model explained NetworkChuck 7 layers'",
    tldr: "The OSI Model breaks network communication into 7 layers — each layer has one job. Data travels down these layers to send, and up to receive.",
    whyItMatters: "When something breaks on a network, engineers use the OSI model to figure out which layer the problem is at. It's a universal troubleshooting framework.",
    analogy: "Imagine sending a letter. You write it (Application), put it in an envelope (Presentation), address it (Network), hand it to the post office (Transport)... each step is a layer.",
    distinctionAnswer: "The OSI model exists not as a literal implementation, but as a conceptual framework. Real-world networking uses TCP/IP (4 layers), but OSI's 7-layer breakdown helps isolate where failures occur — a network engineer debugging a problem asks 'which layer is failing?' not 'is the internet broken?'",
    quiz: [
      { q: "How many layers does the OSI model have?", options: ["4", "5", "7", "9"], answer: 2 },
      { q: "Which layer deals with physical cables and hardware?", options: ["Application", "Transport", "Network", "Physical"], answer: 3 },
      { q: "Which layer is closest to the user/app?", options: ["Application", "Physical", "Data Link", "Session"], answer: 0 },
    ]
  },
  {
    id: 4,
    emoji: "📜",
    title: "What is a Protocol?",
    tag: "Day 5",
    color: "#2ECC71",
    watch: "search: 'network protocols explained beginners'",
    tldr: "A protocol is a set of rules that devices agree on before communicating. Without shared rules, devices can't understand each other.",
    whyItMatters: "Protocols make the internet universal — a device in Melbourne can talk to one in New York because they both follow the same rules (like HTTP, TCP/IP).",
    analogy: "When you meet someone, you shake hands, say hi, then talk — that's a social protocol. HTTP is the same thing but for computers requesting web pages.",
    distinctionAnswer: "Protocols solve the interoperability problem — without them, every manufacturer's devices would need custom software to communicate. TCP provides reliability (checks data arrived), UDP sacrifices reliability for speed (used in video calls where a lost packet is better than a delay).",
    quiz: [
      { q: "What is a network protocol?", options: ["A type of cable", "Agreed rules for communication between devices", "A network speed measurement", "A type of IP address"], answer: 1 },
      { q: "Which protocol do web browsers use to load pages?", options: ["FTP", "SMTP", "HTTP/HTTPS", "UDP"], answer: 2 },
      { q: "TCP vs UDP — TCP is better when you need...", options: ["Speed over accuracy", "Accuracy over speed", "Wireless connection", "More bandwidth"], answer: 1 },
    ]
  },
  {
    id: 5,
    emoji: "📖",
    title: "What is DNS?",
    tag: "Day 6",
    color: "#3498DB",
    watch: "search: 'DNS explained simply NetworkChuck'",
    tldr: "DNS (Domain Name System) translates human-readable names like 'google.com' into IP addresses computers actually use.",
    whyItMatters: "Without DNS, you'd have to memorise the IP address of every website. DNS is the phonebook of the internet — it runs silently behind every website visit.",
    analogy: "You don't memorise your friend's phone number — you search their name in your contacts. DNS does this for websites: you type 'youtube.com' and DNS finds its IP.",
    distinctionAnswer: "DNS is a distributed hierarchical system — not one server holds all addresses. Root servers → TLD servers (.com, .au) → authoritative servers work together. This hierarchy is why the internet is resilient: no single DNS failure can take everything down.",
    quiz: [
      { q: "What does DNS stand for?", options: ["Data Network System", "Domain Name System", "Device Network Service", "Digital Node Server"], answer: 1 },
      { q: "What does DNS translate domain names INTO?", options: ["Usernames", "Passwords", "IP Addresses", "URLs"], answer: 2 },
      { q: "Why is DNS described as 'distributed'?", options: ["It's slow", "No single server holds all records", "It uses UDP", "It's wireless"], answer: 1 },
    ]
  },
];

const NOTE_PROMPTS = [
  "What's one thing from this concept that actually makes sense to you?",
  "If you had to explain this to a friend, what would you say?",
  "What confused you? (It's okay — write it out)",
  "Write the 'distinction answer' in your own words:",
];

export default function StudyCompanion() {
  const [activeTab, setActiveTab] = useState("concepts");
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [conceptView, setConceptView] = useState("learn"); // learn | quiz | notes
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [notes, setNotes] = useState({});
  const [completed, setCompleted] = useState({});
  const [brainDumps, setBrainDumps] = useState([{ id: Date.now(), text: "" }]);
  const [weeklyTemplate, setWeeklyTemplate] = useState({
    weekNum: "", dates: "", theme: "",
    mon: { clicked: "", confused: "", lookup: "" },
    wed: { clicked: "", connected: "", examQ: "" },
    thu: { taught: "", stumbled: "" },
    fri: { three: "", fuzzy: "", distinction: "" },
    rating: "",
  });
  const [savedWeek, setSavedWeek] = useState(false);
  const noteRef = useRef(null);

  const totalConcepts = concepts.length;
  const completedCount = Object.keys(completed).length;

  function openConcept(c) {
    setSelectedConcept(c);
    setConceptView("learn");
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizResults([]);
    setQuizDone(false);
  }

  function handleQuizSelect(idx) {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    const correct = idx === selectedConcept.quiz[quizIndex].answer;
    const newResults = [...quizResults, correct];
    setQuizResults(newResults);
    setTimeout(() => {
      if (quizIndex + 1 < selectedConcept.quiz.length) {
        setQuizIndex(quizIndex + 1);
        setQuizSelected(null);
      } else {
        setQuizDone(true);
      }
    }, 1000);
  }

  function markComplete(id) {
    setCompleted(prev => ({ ...prev, [id]: true }));
    setSelectedConcept(null);
  }

  function updateNote(conceptId, val) {
    setNotes(prev => ({ ...prev, [conceptId]: val }));
  }

  function addBrainDump() {
    setBrainDumps(prev => [...prev, { id: Date.now(), text: "" }]);
  }

  function updateBrainDump(id, val) {
    setBrainDumps(prev => prev.map(b => b.id === id ? { ...b, text: val } : b));
  }

  const score = quizResults.filter(Boolean).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0F",
      color: "#F0EEF8",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        padding: "28px 24px 0",
        borderBottom: "1px solid #1E1E26",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span style={{ fontSize: "22px" }}>🧠</span>
          <span style={{ fontSize: "11px", letterSpacing: "3px", color: "#7C5CFC", textTransform: "uppercase", fontWeight: 700 }}>Computer Networks</span>
        </div>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px" }}>Pre-Study Companion</h1>
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#888", lineHeight: 1.5 }}>
          Apr 17–26 · Navjeet's warm-up before Block 1
        </p>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ flex: 1, height: "6px", background: "#1E1E26", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(completedCount / totalConcepts) * 100}%`,
              background: "linear-gradient(90deg, #7C5CFC, #E8547A)",
              borderRadius: "99px",
              transition: "width 0.5s ease",
            }} />
          </div>
          <span style={{ fontSize: "12px", color: "#888", whiteSpace: "nowrap" }}>{completedCount}/{totalConcepts} done</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0" }}>
          {["concepts", "brain-dump", "weekly"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 16px", fontSize: "13px", fontWeight: 600,
              color: activeTab === tab ? "#F0EEF8" : "#555",
              borderBottom: activeTab === tab ? "2px solid #7C5CFC" : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              {tab === "concepts" ? "📚 Concepts" : tab === "brain-dump" ? "🧹 Brain Dump" : "📋 Weekly Template"}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "20px 24px 40px" }}>

        {/* ── CONCEPTS TAB ── */}
        {activeTab === "concepts" && !selectedConcept && (
          <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>Tap a concept to start. Each one has a lesson, quiz, and notes section.</p>
            {concepts.map(c => (
              <div key={c.id} onClick={() => openConcept(c)} style={{
                background: "#13131A",
                border: `1px solid ${completed[c.id] ? c.color + "55" : "#1E1E26"}`,
                borderRadius: "14px",
                padding: "16px",
                marginBottom: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
              }}>
                {completed[c.id] && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${c.color}, transparent)`,
                  }} />
                )}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: c.color + "22", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "22px", flexShrink: 0,
                }}>
                  {completed[c.id] ? "✅" : c.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", color: c.color, fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>{c.tag}</div>
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>{c.title}</div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{c.tldr.slice(0, 60)}…</div>
                </div>
                <span style={{ color: "#333", fontSize: "18px" }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* ── CONCEPT DETAIL ── */}
        {activeTab === "concepts" && selectedConcept && (
          <div>
            <button onClick={() => setSelectedConcept(null)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#666", fontSize: "13px", display: "flex", alignItems: "center",
              gap: "6px", padding: "0 0 16px", fontFamily: "inherit",
            }}>← Back to concepts</button>

            {/* Concept header */}
            <div style={{
              background: selectedConcept.color + "18",
              border: `1px solid ${selectedConcept.color}44`,
              borderRadius: "14px", padding: "18px", marginBottom: "16px",
              display: "flex", gap: "14px", alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "32px" }}>{selectedConcept.emoji}</span>
              <div>
                <div style={{ fontSize: "11px", color: selectedConcept.color, fontWeight: 700, letterSpacing: "1px" }}>{selectedConcept.tag}</div>
                <div style={{ fontSize: "19px", fontWeight: 800, marginBottom: "4px" }}>{selectedConcept.title}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>📺 {selectedConcept.watch}</div>
              </div>
            </div>

            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
              {["learn", "quiz", "notes"].map(v => (
                <button key={v} onClick={() => setConceptView(v)} style={{
                  padding: "7px 16px", borderRadius: "99px", border: "none",
                  cursor: "pointer", fontSize: "12px", fontWeight: 700,
                  background: conceptView === v ? selectedConcept.color : "#1E1E26",
                  color: conceptView === v ? "#fff" : "#666",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}>
                  {v === "learn" ? "📖 Learn" : v === "quiz" ? "⚡ Quiz" : "✏️ Notes"}
                </button>
              ))}
            </div>

            {/* LEARN VIEW */}
            {conceptView === "learn" && (
              <div>
                <Section title="TL;DR" color={selectedConcept.color}>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.7 }}>{selectedConcept.tldr}</p>
                </Section>
                <Section title="🤔 Why does it matter?" color={selectedConcept.color}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#ccc", lineHeight: 1.7 }}>{selectedConcept.whyItMatters}</p>
                </Section>
                <Section title="💡 Real-world analogy" color={selectedConcept.color}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#ccc", lineHeight: 1.7, fontStyle: "italic" }}>{selectedConcept.analogy}</p>
                </Section>
                <Section title="🎯 Distinction-level answer" color={selectedConcept.color}>
                  <p style={{ margin: 0, fontSize: "13px", color: "#bbb", lineHeight: 1.8, borderLeft: `3px solid ${selectedConcept.color}`, paddingLeft: "12px" }}>{selectedConcept.distinctionAnswer}</p>
                </Section>
                <button onClick={() => setConceptView("quiz")} style={{
                  width: "100%", padding: "14px", borderRadius: "12px", border: "none",
                  background: `linear-gradient(135deg, ${selectedConcept.color}, ${selectedConcept.color}99)`,
                  color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", marginTop: "8px",
                }}>
                  Ready? Take the quiz →
                </button>
              </div>
            )}

            {/* QUIZ VIEW */}
            {conceptView === "quiz" && !quizDone && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>Question {quizIndex + 1} of {selectedConcept.quiz.length}</span>
                  <span style={{ fontSize: "12px", color: selectedConcept.color, fontWeight: 700 }}>
                    {quizResults.filter(Boolean).length} correct so far
                  </span>
                </div>
                <div style={{ background: "#13131A", borderRadius: "14px", padding: "20px", marginBottom: "14px" }}>
                  <p style={{ margin: 0, fontSize: "16px", fontWeight: 700, lineHeight: 1.5 }}>
                    {selectedConcept.quiz[quizIndex].q}
                  </p>
                </div>
                {selectedConcept.quiz[quizIndex].options.map((opt, i) => {
                  const isCorrect = i === selectedConcept.quiz[quizIndex].answer;
                  const isSelected = quizSelected === i;
                  let bg = "#13131A";
                  let borderColor = "#1E1E26";
                  if (quizSelected !== null) {
                    if (isCorrect) { bg = "#2ECC7122"; borderColor = "#2ECC71"; }
                    else if (isSelected) { bg = "#E8547A22"; borderColor = "#E8547A"; }
                  }
                  return (
                    <button key={i} onClick={() => handleQuizSelect(i)} style={{
                      width: "100%", padding: "13px 16px", borderRadius: "10px",
                      border: `1px solid ${borderColor}`,
                      background: bg, color: "#F0EEF8", textAlign: "left",
                      fontSize: "14px", cursor: quizSelected !== null ? "default" : "pointer",
                      marginBottom: "8px", fontFamily: "inherit", transition: "all 0.2s",
                    }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {conceptView === "quiz" && quizDone && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "52px", marginBottom: "12px" }}>
                  {score === 3 ? "🔥" : score === 2 ? "😎" : "😅"}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>{score}/3 correct</h3>
                <p style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}>
                  {score === 3 ? "Nailed it. Distinction energy." : score === 2 ? "Solid. Review the one you missed." : "That's okay — go back to Learn and try again."}
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => { setConceptView("notes"); }} style={{
                    flex: 1, padding: "12px", borderRadius: "10px", border: "none",
                    background: selectedConcept.color, color: "#fff", fontSize: "13px",
                    fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}>Write notes →</button>
                  <button onClick={() => markComplete(selectedConcept.id)} style={{
                    flex: 1, padding: "12px", borderRadius: "10px", border: `1px solid #2ECC71`,
                    background: "#2ECC7122", color: "#2ECC71", fontSize: "13px",
                    fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}>Mark complete ✓</button>
                </div>
              </div>
            )}

            {/* NOTES VIEW */}
            {conceptView === "notes" && (
              <div>
                <p style={{ fontSize: "13px", color: "#666", marginBottom: "14px" }}>
                  No pressure. Just write what sticks. There's no wrong answer here.
                </p>
                {NOTE_PROMPTS.map((prompt, i) => (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "12px", color: selectedConcept.color, fontWeight: 700, display: "block", marginBottom: "6px" }}>
                      {prompt}
                    </label>
                    <textarea
                      value={(notes[selectedConcept.id]?.[i]) || ""}
                      onChange={e => {
                        const curr = notes[selectedConcept.id] || {};
                        updateNote(selectedConcept.id, { ...curr, [i]: e.target.value });
                      }}
                      placeholder="Type here..."
                      style={{
                        width: "100%", minHeight: "70px", background: "#13131A",
                        border: "1px solid #1E1E26", borderRadius: "10px",
                        color: "#F0EEF8", fontSize: "13px", padding: "12px",
                        fontFamily: "inherit", resize: "vertical", outline: "none",
                        lineHeight: 1.6, boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <button onClick={() => markComplete(selectedConcept.id)} style={{
                  width: "100%", padding: "13px", borderRadius: "12px", border: "none",
                  background: "#2ECC71", color: "#000", fontSize: "14px", fontWeight: 800,
                  cursor: "pointer", fontFamily: "inherit", marginTop: "4px",
                }}>
                  ✓ Mark as Complete
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── BRAIN DUMP TAB ── */}
        {activeTab === "brain-dump" && (
          <div>
            <div style={{
              background: "#13131A", borderRadius: "14px", padding: "16px",
              border: "1px solid #1E1E26", marginBottom: "20px",
            }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#888", lineHeight: 1.7 }}>
                🧠 <strong style={{ color: "#F0EEF8" }}>Post-class brain dump.</strong> After each class, spend 15 minutes here. Write everything — what clicked, what was confusing, random thoughts. Don't edit yourself.
              </p>
            </div>
            {brainDumps.map((dump, i) => (
              <div key={dump.id} style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", color: "#7C5CFC", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Dump #{i + 1}
                </label>
                <textarea
                  value={dump.text}
                  onChange={e => updateBrainDump(dump.id, e.target.value)}
                  placeholder="Start typing... What just happened in class? What stuck? What didn't?"
                  style={{
                    width: "100%", minHeight: "100px", background: "#13131A",
                    border: "1px solid #1E1E26", borderRadius: "10px",
                    color: "#F0EEF8", fontSize: "13px", padding: "12px",
                    fontFamily: "inherit", resize: "vertical", outline: "none",
                    lineHeight: 1.7, boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <button onClick={addBrainDump} style={{
              width: "100%", padding: "12px", borderRadius: "10px",
              border: "1px dashed #333", background: "none",
              color: "#666", fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
            }}>
              + Add another dump
            </button>
          </div>
        )}

        {/* ── WEEKLY TEMPLATE TAB ── */}
        {activeTab === "weekly" && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <input
                placeholder="Week #"
                value={weeklyTemplate.weekNum}
                onChange={e => setWeeklyTemplate(p => ({ ...p, weekNum: e.target.value }))}
                style={inputStyle}
              />
              <input
                placeholder="Dates (e.g. Apr 27 – May 2)"
                value={weeklyTemplate.dates}
                onChange={e => setWeeklyTemplate(p => ({ ...p, dates: e.target.value }))}
                style={{ ...inputStyle, flex: 2 }}
              />
            </div>
            <input
              placeholder="Theme this week (fill after Monday class)"
              value={weeklyTemplate.theme}
              onChange={e => setWeeklyTemplate(p => ({ ...p, theme: e.target.value }))}
              style={{ ...inputStyle, marginBottom: "18px" }}
            />

            {[
              { key: "mon", label: "🟣 Monday — Post-Class", fields: [
                { key: "clicked", label: "What clicked today:" },
                { key: "confused", label: "What confused me:" },
                { key: "lookup", label: "One term to look up:" },
              ]},
              { key: "wed", label: "🔵 Wednesday — Post-Class", fields: [
                { key: "clicked", label: "What clicked today:" },
                { key: "connected", label: "How does this connect to Monday?" },
                { key: "examQ", label: "One exam question I'd write:" },
              ]},
              { key: "thu", label: "🟡 Thursday — Teach It Back", fields: [
                { key: "taught", label: "Concept I explained out loud:" },
                { key: "stumbled", label: "Where I stumbled (gap to fill):" },
              ]},
              { key: "fri", label: "🔴 Friday — Weekly Wrap", fields: [
                { key: "three", label: "3 things I now understand:" },
                { key: "fuzzy", label: "1 thing still fuzzy:" },
                { key: "distinction", label: "Distinction answer for this week's key topic (WHY, not just WHAT):" },
              ]},
            ].map(section => (
              <div key={section.key} style={{ marginBottom: "18px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ccc", marginBottom: "10px" }}>
                  {section.label}
                </div>
                {section.fields.map(field => (
                  <div key={field.key} style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.5px" }}>
                      {field.label}
                    </label>
                    <textarea
                      value={weeklyTemplate[section.key][field.key] || ""}
                      onChange={e => setWeeklyTemplate(p => ({
                        ...p,
                        [section.key]: { ...p[section.key], [field.key]: e.target.value }
                      }))}
                      style={{
                        width: "100%", minHeight: "60px", background: "#13131A",
                        border: "1px solid #1E1E26", borderRadius: "8px",
                        color: "#F0EEF8", fontSize: "13px", padding: "10px",
                        fontFamily: "inherit", resize: "vertical", outline: "none",
                        lineHeight: 1.6, boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Rating */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#ccc", marginBottom: "10px" }}>Week rating:</div>
              <div style={{ display: "flex", gap: "10px" }}>
                {["😵", "😐", "🙂", "🔥"].map(r => (
                  <button key={r} onClick={() => setWeeklyTemplate(p => ({ ...p, rating: r }))} style={{
                    width: "52px", height: "52px", borderRadius: "12px",
                    border: weeklyTemplate.rating === r ? "2px solid #7C5CFC" : "1px solid #1E1E26",
                    background: weeklyTemplate.rating === r ? "#7C5CFC22" : "#13131A",
                    fontSize: "24px", cursor: "pointer",
                  }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setSavedWeek(true)} style={{
              width: "100%", padding: "14px", borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #7C5CFC, #E8547A)",
              color: "#fff", fontSize: "14px", fontWeight: 800, cursor: "pointer",
              fontFamily: "inherit",
            }}>
              {savedWeek ? "✓ Saved this week!" : "Save this week's template"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{
      background: "#13131A", borderRadius: "12px", padding: "14px 16px",
      marginBottom: "12px", borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: "11px", fontWeight: 800, color: color, letterSpacing: "1px", marginBottom: "8px", textTransform: "uppercase" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "10px 14px",
  background: "#13131A",
  border: "1px solid #1E1E26",
  borderRadius: "8px",
  color: "#F0EEF8",
  fontSize: "13px",
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
