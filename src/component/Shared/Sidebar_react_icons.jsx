import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { MdHome, MdWarning, MdPeople, MdTrendingUp, MdAccountBox, MdCollectionsBookmark, MdAnnouncement, MdSettings, MdExpandMore, MdChevronRight } from 'react-icons/md'; // Import icons
import Face1 from '../../assets/face1.jpg';
import './Sidebar1.css'; // Import your CSS file

const Sidebar = () => {
  const [menuState, setMenuState] = useState({});
  const location = useLocation();

  const toggleMenuState = (menuStateKey) => {
    setMenuState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [menuStateKey]: !prevState[menuStateKey],
    }));
  };

  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
    setMenuState({});

    const dropdownPaths = [
      { path: '/dashboard', state: 'dashboardMenuOpen' },
      { path: '/patient-management/view', state: 'patientManagementMenuOpen' },
      { path: '/patient-management/statuses', state: 'patientManagementMenuOpen' },
      { path: '/patient-management/assign-questions', state: 'patientManagementMenuOpen' },
      { path: '/subscription-management/portal', state: 'subscriptionManagementMenuOpen' },
      { path: '/subscription-management/clinician', state: 'subscriptionManagementMenuOpen' },
      { path: '/test-management/create', state: 'testManagementMenuOpen' },
      { path: '/test-management/manage', state: 'testManagementMenuOpen' },
      { path: '/test-management/ai-questions', state: 'testManagementMenuOpen' },
      { path: '/banner-management/upload', state: 'bannerAnnouncementManagementMenuOpen' },
      { path: '/banner-management/view', state: 'bannerAnnouncementManagementMenuOpen' },
      { path: '/subscription-budget-analysis/overview', state: 'subscriptionBudgetAnalysisMenuOpen' },
      { path: '/settings', state: 'settingsMenuOpen' },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setMenuState((prevState) => ({
          ...prevState,
          [obj.state]: true,
        }));
      }
    });
  };

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    onRouteChanged();
    const body = document.querySelector('body');
    const sidebarItems = document.querySelectorAll('.sidebar .nav-item');

    sidebarItems.forEach((el) => {
      const handleMouseOver = () => {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      };

      const handleMouseOut = () => {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      };

      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);

      // Cleanup event listeners on component unmount
      return () => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      };
    });
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <Link to="/profile" className="nav-link">
            <div className="nav-profile-image">
              <img src={Face1} alt="profile" />
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text">
              <span className="font-weight-bold mb-2">Ram</span>
              <span className="text-medium">Super Admin</span>
            </div>
            <MdCollectionsBookmark className="mdi-bookmark-check text-success nav-profile-badge" />
          </Link>
        </li>
        <li className={isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">Dashboard</span>
            <MdHome className="menu-icon" />
          </Link>
        </li>

        <li className={isPathActive('/subscription-budget-analysis/overview') ? 'nav-item active' : 'nav-item'}>
          <Link className="nav-link" to="/subscription-budget-analysis/overview">
            <span className="menu-title">Budget Analysis</span>
            <MdTrendingUp className="menu-icon" />
          </Link>
        </li>

        <li className={isPathActive('/patient-management/view') ? 'nav-item active' : 'nav-item'}>
          <Link className="nav-link" to="/patient-management/view">
            <span className="menu-title">Patient Management</span>
            <MdPeople className="menu-icon" />
          </Link>
        </li>

        <li className={isPathActive('/subscription-management/portal') || isPathActive('/subscription-management/clinician') ? 'nav-item active' : 'nav-item'}>
          <div
            className={menuState.subscriptionManagementMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
            onClick={() => toggleMenuState('subscriptionManagementMenuOpen')}
            data-toggle="collapse"
          >
            <span className="menu-title">Subscriptions</span>
            <MdAccountBox className="menu-icon" />
            <MdExpandMore className="menu-arrow" />
          </div>
          <Collapse in={menuState.subscriptionManagementMenuOpen}>
            <ul className="nav flex-column m-0 p-0 sub-menu">
              <li className="nav-item">
                <Link className={isPathActive('/subscription-management/portal') ? 'nav-link active' : 'nav-link'} to="/subscription-management/portal">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">Portal</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={isPathActive('/subscription-management/clinician') ? 'nav-link active' : 'nav-link'} to="/subscription-management/clinician">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">Clinician</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={isPathActive('/subscription-management/organization') ? 'nav-link active' : 'nav-link'} to="/subscription-management/organization">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">Organization</span>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className={isPathActive('/test-management/create') || isPathActive('/test-management/manage') || isPathActive('/test-management/ai-questions') ? 'nav-item active' : 'nav-item'}>
          <div
            className={menuState.testManagementMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
            onClick={() => toggleMenuState('testManagementMenuOpen')}
            data-toggle="collapse"
          >
            <span className="menu-title">Assessment</span>
            <MdCollectionsBookmark className="menu-icon" />
            <MdExpandMore className="menu-arrow" />
          </div>
          <Collapse in={menuState.testManagementMenuOpen}>
            <ul className="nav flex-column m-0 p-0 sub-menu">
              <li className="nav-item">
                <Link className={isPathActive('/test-management/manage') ? 'nav-link active' : 'nav-link'} to="/test-management/manage">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">Manage Assessment</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={isPathActive('/test-management/ai-questions') ? 'nav-link active' : 'nav-link'} to="/test-management/ai-questions">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">AI Questions</span>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className={isPathActive('/banner-management/view') || isPathActive('/banner-management/upload') ? 'nav-item active' : 'nav-item'}>
          <div
            className={menuState.bannerAnnouncementManagementMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
            onClick={() => toggleMenuState('bannerAnnouncementManagementMenuOpen')}
            data-toggle="collapse"
          >
            <span className="menu-title">Banners & Announcements</span>
            <MdAnnouncement className="menu-icon" />
            <MdExpandMore className="menu-arrow" />
          </div>
          <Collapse in={menuState.bannerAnnouncementManagementMenuOpen}>
            <ul className="nav flex-column m-0 p-0 sub-menu">
              <li className="nav-item">
                <Link className={isPathActive('/banner-management/view') ? 'nav-link active' : 'nav-link'} to="/banner-management/view">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">View Banners</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={isPathActive('/banner-management/upload') ? 'nav-link active' : 'nav-link'} to="/banner-management/upload">
                  <MdChevronRight className="menu-arrow" />
                  <span className="menu-title">Upload Banner</span>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className={isPathActive('/settings') ? 'nav-item active' : 'nav-item'}>
          <Link className="nav-link" to="/settings">
            <span className="menu-title">Settings</span>
            <MdSettings className="menu-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;