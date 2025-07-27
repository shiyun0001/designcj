import React, { useState } from 'react';

interface WelcomeProps {
    onGetStarted: () => void;
    vscode: any;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted, vscode }) => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@') || submitting) {
            return;
        }
        
        setSubmitting(true);
        
        // Submit email to backend via extension
        vscode.postMessage({
            command: 'submitEmail',
            email
        });
        
        // Set up listener for response
        const handleEmailResponse = (event: MessageEvent) => {
            const message = event.data;
            
            if (message.command === 'emailSubmitSuccess') {
                setSubmitted(true);
                setSubmitting(false);
                // Also trigger get started flow
                setTimeout(() => {
                    onGetStarted();
                }, 1500);
            } else if (message.command === 'emailSubmitError') {
                setSubmitting(false);
                alert('提交邮箱时出错：' + message.error);
            }
            
            window.removeEventListener('message', handleEmailResponse);
        };
        
        window.addEventListener('message', handleEmailResponse);
    };
    
    return (
        <div className="welcome-screen">
            <div className="welcome-logo">
                <div className="logo-container">
                    <img src="data:image/svg+xml,%3Csvg width='75' height='75' viewBox='0 0 75 75' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M38.0018 0.00196677C54.5815 -0.247434 67.3569 10.923 72.8095 26.6538C78.0532 41.7267 73.679 58.564 60.7963 67.6748C47.44 77.1592 30.2035 78.3054 16.0851 70.0093C1.96657 61.7131 -4.05557 45.6992 3.09193 31.0355C9.97093 16.9577 22.6794 0.239594 38.0018 0.00196677Z' fill='%23BBFE00'/%3E%3C/svg%3E" alt="SuperDesign Logo" />
                    <h1>超级设计</h1>
                </div>
            </div>
            <h2 className="welcome-title">欢迎使用超级设计</h2>
            <p className="welcome-description">
                超级设计是VS Code中的设计助手，帮助您创建精美的UI设计原型。无需离开您的IDE，通过AI生成令人惊叹的界面设计。
            </p>
            
            <div className="feature-list">
                <div className="feature-item">
                    <span className="feature-icon">✨</span>
                    <div className="feature-content">
                        <h3>AI驱动的设计</h3>
                        <p>使用AI生成响应式UI组件和页面</p>
                    </div>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">🔍</span>
                    <div className="feature-content">
                        <h3>画布预览</h3>
                        <p>实时预览和调整您的设计</p>
                    </div>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">💻</span>
                    <div className="feature-content">
                        <h3>代码导出</h3>
                        <p>将设计导出为干净的HTML和CSS</p>
                    </div>
                </div>
            </div>
            
            {!submitted ? (
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <p className="signup-text">获取更新和设计提示</p>
                        <div className="form-fields">
                            <input 
                                type="email" 
                                placeholder="您的邮箱地址" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={submitting}
                                required
                            />
                            <button 
                                type="submit"
                                disabled={!email || !email.includes('@') || submitting}
                                className={submitting ? 'submitting' : ''}
                            >
                                {submitting ? '提交中...' : '订阅'}
                            </button>
                        </div>
                    </form>
                    <div className="skip-wrapper">
                        <button className="skip-button" onClick={onGetStarted}>
                            跳过 →
                        </button>
                    </div>
                </div>
            ) : (
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <p>感谢您的订阅！</p>
                    <button className="start-button" onClick={onGetStarted}>
                        开始设计 →
                    </button>
                </div>
            )}
            
            <div className="welcome-footer">
                <p>由Anthropic的Claude提供支持</p>
            </div>
        </div>
    );
};

export default Welcome; 