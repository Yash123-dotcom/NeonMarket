import React from 'react';
import './components.css';

const CyberButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  ...props
}) => {
  const getButtonClass = () => {
    let baseClass = 'cyber-btn';

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseClass += ' cyber-btn-secondary';
        break;
      case 'outline':
        baseClass += ' cyber-btn-outline';
        break;
      default:
        baseClass += ' cyber-btn-primary';
    }

    // Size styles
    switch (size) {
      case 'small':
        baseClass += ' cyber-btn-sm';
        break;
      case 'large':
        baseClass += ' cyber-btn-lg';
        break;
      default:
        baseClass += ' cyber-btn-md';
    }

    if (disabled) {
      baseClass += ' cyber-btn-disabled';
    }

    return baseClass;
  };

  return (
    <button className={getButtonClass()} onClick={onClick} disabled={disabled} {...props}>
      <span className='cyber-btn-text'>{children}</span>
      <div className='cyber-btn-glow'></div>
    </button>
  );
};

// Additional button variants
export const CyberButtonSecondary = (props) => <CyberButton variant='secondary' {...props} />;

export const CyberButtonOutline = (props) => <CyberButton variant='outline' {...props} />;

export const CyberButtonLarge = (props) => <CyberButton size='large' {...props} />;

export const CyberButtonSmall = (props) => <CyberButton size='small' {...props} />;

export default CyberButton;
