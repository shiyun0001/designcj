import React, { useState } from 'react';

interface CustomUrlConfigProps {
  vscode: any;
  isEnabled: boolean;
  provider: string;
}

const CustomUrlConfig: React.FC<CustomUrlConfigProps> = ({ vscode, isEnabled, provider }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleConfig = () => {
    vscode.postMessage({
      command: 'configureCustomBaseUrl'
    });
  };

  return (
    <div className="custom-url-config">
      <style>
        {`
          .custom-url-config {
            margin-top: 8px;
            margin-bottom: 4px;
            font-size: 11px;
          }
          
          .url-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 6px;
            background-color: ${isEnabled 
              ? 'var(--vscode-inputValidation-infoBackground)' 
              : 'transparent'};
            border: 1px solid ${isEnabled 
              ? 'var(--vscode-inputValidation-infoBorder)' 
              : 'var(--vscode-input-border)'};
            border-radius: 3px;
            cursor: pointer;
          }
          
          .url-status:hover {
            background-color: ${isEnabled 
              ? 'var(--vscode-inputValidation-infoBackground)' 
              : 'var(--vscode-list-hoverBackground)'};
          }
          
          .url-status-text {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .url-status-icon {
            font-size: 12px;
          }
          
          .url-config-button {
            border: none;
            background: transparent;
            color: var(--vscode-button-foreground);
            background-color: var(--vscode-button-background);
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 2px;
            cursor: pointer;
            white-space: nowrap;
          }
          
          .url-config-button:hover {
            background-color: var(--vscode-button-hoverBackground);
          }
        `}
      </style>
      
      <div className="url-status" onClick={() => setExpanded(!expanded)}>
        <div className="url-status-text">
          <span className="url-status-icon">
            {isEnabled ? '🔗' : '🌐'}
          </span>
          <span>
            {isEnabled 
              ? '使用自定义API URL' 
              : '使用默认API URL'}
          </span>
        </div>
        
        <button 
          className="url-config-button" 
          onClick={(e) => {
            e.stopPropagation();
            toggleConfig();
          }}
        >
          配置
        </button>
      </div>
    </div>
  );
};

export default CustomUrlConfig; 