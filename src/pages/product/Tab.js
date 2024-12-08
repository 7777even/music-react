import React, { useState } from 'react';

// Tab 组件
const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tab-container">
      <div className="tab-titles">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab-title ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map(tab => (
          tab.id === activeTab && (
            <div key={tab.id} className="tab-panel">
              {tab.content}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Tab;
