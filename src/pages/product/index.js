import React from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab'; // 假设 Tab 组件保存在 Tab.js 中

const App = () => {
    const tabs = [
        { id: 1, title: 'Tab 1', content: 'This is the content of Tab 1' },
        { id: 2, title: 'Tab 2', content: 'This is the content of Tab 2' },
        { id: 3, title: 'Tab 3', content: 'This is the content of Tab 3' }
    ];

    return (
        <div>
            <h1>My Tab Component</h1>
            <Tab tabs={tabs} />
        </div>


    );
};

ReactDOM.render(<App />, document.getElementById('root'));

