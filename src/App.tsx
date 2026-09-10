import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AiLawTutor } from './components/AiLawTutor';
import { LegalResearchCenter } from './components/LegalResearchCenter';
import { ConstitutionLibrary } from './components/ConstitutionLibrary';
import { LecturerDashboard } from './components/LecturerDashboard';
import { CoursesHub } from './components/CoursesHub';
import { PastPapersLibrary } from './components/PastPapersLibrary';
import { QuizCentre } from './components/QuizCentre';
import { LegalDraftingTool } from './components/LegalDraftingTool';
import { NotesAndBookmarks } from './components/NotesAndBookmarks';
import { DownloadsHub } from './components/DownloadsHub';
import { DeveloperAbout } from './components/DeveloperAbout';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RoadmapPage } from './components/RoadmapPage';
import { AdminPanel } from './components/AdminPanel';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { AccessDenied } from './components/AccessDenied';
import { WatermarkBackground, WatermarkType } from './components/WatermarkBackground';
import { WatermarkSelectorModal } from './components/WatermarkSelectorModal';

import { UserRole, UserProfile, Course, SavedNote } from './types';
import { lawCoursesCatalog, initialNotesList } from './data/mockData';
import { authService } from './services/authService';

export function App() {
  // Persistent User Profile State with real role preservation
  const [user, setUser] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('lawhub_student_profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role) {
          return parsed;
        }
      } catch (e) {}
    }
    return {
      id: 'usr_student_1',
      name: 'Student Scholar',
      email: 'student@lawhub.ug',
      role: 'Student',
      institution: 'Faculty of Law',
      studyStreakDays: 14,
      completedQuizzes: 24,
      savedNotesCount: initialNotesList.length,
      bookmarkedCasesCount: 42,
      joinedDate: 'January 2025'
    };
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const savedTab = localStorage.getItem('lawhub_active_tab');
    if (savedTab && savedTab !== 'welcome') {
      return savedTab;
    }
    return 'welcome';
  });

  const [initialTutorPrompt, setInitialTutorPrompt] = useState<string>('');
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'edit_profile'>('login');

  // Watermark Ambience State - Defaulting to the Chosen Best Watermark (Corinthian Pillars & Lady Justice)
  const [watermarkType, setWatermarkType] = useState<WatermarkType>(() => {
    const saved = localStorage.getItem('lawhub_watermark_theme');
    return (saved as WatermarkType) || 'classic_watermark';
  });
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('lawhub_watermark_opacity');
    return saved ? parseFloat(saved) : 0.18;
  });
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(() => {
    const saved = localStorage.getItem('lawhub_watermark_autocycle');
    return saved !== null ? saved === 'true' : true;
  });
  const [isWatermarkModalOpen, setIsWatermarkModalOpen] = useState<boolean>(false);

  // Tab to Watermark Mapping when AutoCycle is enabled
  useEffect(() => {
    if (!isAutoCycle) return;
    const tabThemeMap: Record<string, WatermarkType> = {
      welcome: 'classic_watermark',
      landing: 'classic_watermark',
      dashboard: 'golden_tome',
      'lecturer-dashboard': 'classic_watermark',
      tutor: 'cyber_tech_scales',
      constitution: 'classic_watermark',
      research: 'golden_tome',
      courses: 'classic_watermark',
      past_papers: 'minimal_court_scales',
      quizzes: 'golden_tome',
      drafting: 'classic_watermark',
      notes: 'golden_tome',
      downloads: 'classic_watermark',
      developer: 'classic_watermark',
      roadmap: 'cyber_tech_scales',
      admin: 'classic_watermark'
    };

    const matchingTheme = tabThemeMap[activeTab];
    if (matchingTheme && matchingTheme !== watermarkType) {
      setWatermarkType(matchingTheme);
    }
  }, [activeTab, isAutoCycle]);

  // Persist Watermark settings
  useEffect(() => {
    localStorage.setItem('lawhub_watermark_theme', watermarkType);
  }, [watermarkType]);

  useEffect(() => {
    localStorage.setItem('lawhub_watermark_opacity', watermarkOpacity.toString());
  }, [watermarkOpacity]);

  useEffect(() => {
    localStorage.setItem('lawhub_watermark_autocycle', isAutoCycle.toString());
  }, [isAutoCycle]);

  // Global Cmd+K / Ctrl+K listener for instant search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync with persistent backend store on mount / email change to ensure authentic role
  useEffect(() => {
    if (user.email) {
      fetch(`/api/auth/me?email=${encodeURIComponent(user.email)}`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.user) {
            setUser((prev) => {
              const updated = {
                ...prev,
                name: data.user.name || prev.name,
                role: (data.user.role as UserRole) || prev.role,
                institution: data.user.institution || prev.institution
              };
              localStorage.setItem('lawhub_student_profile', JSON.stringify(updated));
              return updated;
            });
          }
        })
        .catch(() => {});
    }
  }, [user.email]);

  useEffect(() => {
    localStorage.setItem('lawhub_student_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (activeTab !== 'welcome') {
      localStorage.setItem('lawhub_active_tab', activeTab);
    }
  }, [activeTab]);

  const [courses] = useState<Course[]>(lawCoursesCatalog);
  const [notes, setNotes] = useState<SavedNote[]>(initialNotesList);

  const handleRoleChange = async (targetRole: UserRole) => {
    // Security abstraction: changing accounts/roles requires legitimate credential authentication
    if (user.role !== targetRole) {
      handleOpenAuth('login');
    }
  };

  const handleOpenTutorWithPrompt = (prompt: string) => {
    setInitialTutorPrompt(prompt);
    setActiveTab('tutor');
  };

  const handleAddNote = (newNote: SavedNote) => {
    setNotes((prev) => [newNote, ...prev]);
    setUser((prev) => ({ ...prev, savedNotesCount: prev.savedNotesCount + 1 }));
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setUser((prev) => ({ ...prev, savedNotesCount: Math.max(0, prev.savedNotesCount - 1) }));
  };

  const handleOpenAuth = (mode: 'login' | 'signup' | 'edit_profile' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (email: string, name?: string, role?: UserRole) => {
    const cleanEmail = email.toLowerCase().includes('kaggwa') ? 'apollo.mukasa@lawhub.ug' : email;
    const assignedRole: UserRole = role || (cleanEmail.includes('admin') ? 'Administrator' : cleanEmail.includes('mukasa') || cleanEmail.includes('lecturer') ? 'Lecturer' : 'Student');
    const updated: UserProfile = {
      ...user,
      email: cleanEmail,
      name: name || (cleanEmail === 'admin@lawhub.ug' ? 'Chief Legal Administrator' : (cleanEmail.includes('mukasa') || cleanEmail.includes('lecturer')) ? 'Dr. Apollo Mukasa' : 'Student Scholar'),
      role: assignedRole,
      institution: assignedRole === 'Administrator' ? 'LawHub Academic Directorate' : 'Faculty of Law'
    };

    setUser(updated);
    localStorage.setItem('lawhub_student_profile', JSON.stringify(updated));

    // Auto-route based on stored/authenticated role
    if (assignedRole === 'Administrator') {
      setActiveTab('admin');
    } else if (assignedRole === 'Lecturer') {
      setActiveTab('lecturer-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSignUp = (data: { name: string; email: string; institution: string; role: UserRole }) => {
    const assignedRole = data.role || 'Student';
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: assignedRole,
      institution: data.institution || 'Faculty of Law',
      studyStreakDays: 1,
      completedQuizzes: 0,
      savedNotesCount: 0,
      bookmarkedCasesCount: 0,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    setUser(newUser);
    localStorage.setItem('lawhub_student_profile', JSON.stringify(newUser));

    // Auto-route based on registered role
    if (assignedRole === 'Administrator') {
      setActiveTab('admin');
    } else if (assignedRole === 'Lecturer') {
      setActiveTab('lecturer-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const merged = { ...prev, ...updated };
      localStorage.setItem('lawhub_student_profile', JSON.stringify(merged));
      return merged;
    });
  };

  const handleLogout = async () => {
    await authService.logout();
    const guestUser: UserProfile = {
      id: 'usr_guest',
      name: 'Guest Scholar',
      email: '',
      role: 'Student',
      institution: 'Faculty of Law',
      studyStreakDays: 1,
      completedQuizzes: 0,
      savedNotesCount: 0,
      bookmarkedCasesCount: 0,
      joinedDate: 'Guest Session'
    };
    setUser(guestUser);
    localStorage.setItem('lawhub_student_profile', JSON.stringify(guestUser));
    setActiveTab('welcome');
  };

  const handleEnterPlatform = () => {
    if (user.role === 'Administrator') {
      setActiveTab('admin');
    } else if (user.role === 'Lecturer') {
      setActiveTab('lecturer-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  if (activeTab === 'welcome') {
    return (
      <WelcomeScreen
        onEnter={handleEnterPlatform}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onOpenAuth={handleOpenAuth}
        user={user}
        onNavigate={(tab) => {
          // Safeguard protected tabs
          if (tab === 'admin' && user.role !== 'Administrator') {
            handleOpenAuth('login');
          } else if (tab === 'lecturer-dashboard' && user.role !== 'Lecturer' && user.role !== 'Administrator') {
            handleOpenAuth('login');
          } else {
            setActiveTab(tab);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 flex flex-col font-sans selection:bg-[#c89d42] selection:text-neutral-950 relative overflow-x-hidden">
      
      {/* Global Dynamic High-Tech Legal Watermark Background */}
      <WatermarkBackground
        type={watermarkType}
        opacity={watermarkOpacity}
        fixed={true}
        blendMode="normal"
        withVignette={false}
        withGradientOverlay={false}
      />

      {/* Top Fixed Header Navbar */}
      <Navbar
        user={user}
        userRole={user.role}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenWatermarkGallery={() => setIsWatermarkModalOpen(true)}
        onLogout={handleLogout}
        onToggleSidebarDrawer={() => setIsSidebarDrawerOpen(!isSidebarDrawerOpen)}
      />

      {/* Main App Body */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            // Guard role access
            if (tab === 'admin' && user.role !== 'Administrator') {
              handleOpenAuth('login');
            } else if (tab === 'lecturer-dashboard' && user.role !== 'Lecturer' && user.role !== 'Administrator') {
              handleOpenAuth('login');
            } else {
              setActiveTab(tab);
            }
          }}
          isAdmin={user.role === 'Administrator'}
          userRole={user.role}
          isOpen={isSidebarDrawerOpen}
          onClose={() => setIsSidebarDrawerOpen(false)}
        />

        {/* Main View Area */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'landing' && (
            <LandingPage
              onStartLearning={() => setActiveTab('tutor')}
              onExploreResearch={() => setActiveTab('research')}
              onTryDrafting={() => setActiveTab('drafting')}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'dashboard' && (
            <StudentDashboard
              user={user}
              courses={courses}
              savedNotes={notes}
              onSelectTab={setActiveTab}
              onOpenTutorWithPrompt={handleOpenTutorWithPrompt}
              onOpenAuthModal={handleOpenAuth}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {activeTab === 'constitution' && (
            <ConstitutionLibrary
              userRole={user.role}
              onOpenAdminUpload={() => {
                if (user.role === 'Administrator') {
                  setActiveTab('admin');
                } else {
                  handleOpenAuth('login');
                }
              }}
              onOpenTutorWithPrompt={handleOpenTutorWithPrompt}
            />
          )}

          {activeTab === 'lecturer-dashboard' && (
            user.role === 'Lecturer' || user.role === 'Administrator' ? (
              <LecturerDashboard
                user={user}
                onOpenTutorWithPrompt={handleOpenTutorWithPrompt}
                onNavigateToTab={setActiveTab}
              />
            ) : (
              <AccessDenied
                requiredRole="Faculty Lecturer"
                currentRole={user.role}
                onOpenAuth={() => handleOpenAuth('login')}
                onReturnToDashboard={() => setActiveTab('dashboard')}
              />
            )
          )}

          {activeTab === 'tutor' && (
            <AiLawTutor
              userRole={user.role}
              initialPrompt={initialTutorPrompt}
              onClearInitialPrompt={() => setInitialTutorPrompt('')}
            />
          )}

          {activeTab === 'research' && <LegalResearchCenter />}

          {activeTab === 'courses' && (
            <CoursesHub onOpenTutorWithPrompt={handleOpenTutorWithPrompt} />
          )}

          {activeTab === 'past_papers' && (
            <PastPapersLibrary onOpenTutorWithPrompt={handleOpenTutorWithPrompt} />
          )}

          {activeTab === 'quizzes' && <QuizCentre />}

          {activeTab === 'drafting' && <LegalDraftingTool />}

          {activeTab === 'notes' && (
            <NotesAndBookmarks
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          )}

          {activeTab === 'downloads' && <DownloadsHub />}

          {activeTab === 'developer' && (
            user.role === 'Administrator' ? (
              <DeveloperAbout />
            ) : (
              <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="bg-[#121216]/80 border border-white/10 rounded-3xl max-w-lg w-full p-8 text-center space-y-4 shadow-xl backdrop-blur-md">
                  <div className="w-14 h-14 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] rounded-2xl flex items-center justify-center mx-auto">
                    <span className="font-heading font-extrabold text-xl">LH</span>
                  </div>
                  <h2 className="text-xl font-heading font-extrabold text-slate-100">LawHub Legal Platform</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    LawHub is an integrated legal repository and learning system combining authentic constitutional archives, verified statutes, past exam papers, and artificial intelligence reasoning tools for Ugandan legal education.
                  </p>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-[#09090b] text-xs font-heading font-bold rounded-xl transition cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )
          )}

          {activeTab === 'roadmap' && <RoadmapPage />}

          {activeTab === 'admin' && (
            user.role === 'Administrator' ? (
              <AdminPanel
                user={user}
                onNavigateToTab={setActiveTab}
              />
            ) : (
              <AccessDenied
                requiredRole="Administrator"
                currentRole={user.role}
                onOpenAuth={() => handleOpenAuth('login')}
                onReturnToDashboard={() => setActiveTab('dashboard')}
              />
            )
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(type, _id, extraData) => {
          setIsSearchOpen(false);
          if (type === 'Constitution') {
            setActiveTab('constitution');
          } else if (type === 'Statutes' || type === 'Case Law') {
            setActiveTab('research');
          } else if (type === 'Courses') {
            setActiveTab('courses');
          } else if (type === 'Past Papers') {
            setActiveTab('past_papers');
          } else if (type === 'Notes') {
            setActiveTab('notes');
          }
          if (extraData?.title) {
            setInitialTutorPrompt(`Explain the legal principles and practical application of ${extraData.title} under Ugandan Law.`);
          }
        }}
        onOpenTutorWithPrompt={(prompt) => {
          setIsSearchOpen(false);
          handleOpenTutorWithPrompt(prompt);
        }}
      />

      {/* Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        mode={authModalMode}
        user={user}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onUpdateProfile={handleUpdateUser}
        onLogout={handleLogout}
      />

      {/* Legal Tech Watermark Ambience Gallery Modal */}
      <WatermarkSelectorModal
        isOpen={isWatermarkModalOpen}
        onClose={() => setIsWatermarkModalOpen(false)}
        currentWatermark={watermarkType}
        onSelectWatermark={(newType) => {
          setWatermarkType(newType);
          setIsAutoCycle(false); // Manually selecting disables auto-cycle so user preference is locked
        }}
        opacity={watermarkOpacity}
        onChangeOpacity={setWatermarkOpacity}
        isAutoCycle={isAutoCycle}
        onToggleAutoCycle={() => setIsAutoCycle((prev) => !prev)}
      />

    </div>
  );
}

export default App;
