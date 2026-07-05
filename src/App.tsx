import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { VSCodeLayout } from './components/VSCodeLayout';
import Movies from './components/Movies';
import Gaming from './components/Gaming';
import Story from './components/Story';

function ScrollToTopAndHash() {
  const location = useLocation();

  useEffect(() => {
    // Scroll internal editor pane instead of body window
    const editorPane = document.querySelector('.overflow-y-auto');
    if (editorPane) {
      editorPane.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export function App() {
  return (
    <Router>
      <ScrollToTopAndHash />
      <div 
        className="w-full h-screen h-[100dvh] bg-[var(--vscode-editor-bg)] text-[var(--vscode-text)] font-mono selection:bg-[#264F78]/50 select-none overflow-hidden"
      >
        <main className="w-full h-full">
          <Routes>
            {/* All paths rendered inside VS Code wrapper */}
            <Route element={<VSCodeLayout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/story" element={<Story />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;