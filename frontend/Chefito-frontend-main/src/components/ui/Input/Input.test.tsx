import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { Mail, Eye } from 'lucide-react';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-neutral-300');
  });

  it('renders with label', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders with required indicator', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    render(<Input leftIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(<Input rightIcon={<Eye data-testid="eye-icon" />} />);
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('shows error state and message', () => {
    render(<Input error="This field is required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-error-500');
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test@example.com');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-14');
  });

  it('applies correct padding with icons', () => {
    const { rerender } = render(<Input leftIcon={<Mail />} />);
    expect(screen.getByRole('textbox')).toHaveClass('pl-10');

    rerender(<Input rightIcon={<Eye />} />);
    expect(screen.getByRole('textbox')).toHaveClass('pr-10');
  });

  it('has proper accessibility attributes', () => {
    render(
      <Input 
        label="Email" 
        error="Invalid email" 
        helperText="Enter your email"
        required
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('generates unique IDs for multiple inputs', () => {
    render(
      <div>
        <Input label="First Input" />
        <Input label="Second Input" />
      </div>
    );
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('id');
    expect(inputs[1]).toHaveAttribute('id');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('prioritizes error over helper text', () => {
    render(
      <Input 
        error="This is an error" 
        helperText="This is helper text"
      />
    );
    
    expect(screen.getByText(/this is an error/i)).toBeInTheDocument();
    expect(screen.queryByText(/this is helper text/i)).not.toBeInTheDocument();
  });
});