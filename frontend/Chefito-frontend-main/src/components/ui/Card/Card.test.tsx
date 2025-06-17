import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card',() => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-2xl');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText(/default/i)).toHaveClass('shadow-sm');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText(/elevated/i)).toHaveClass('shadow-md');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText(/outlined/i)).toHaveClass('border-2');
  });

  it('renders different padding sizes', () => {
    const { rerender } = render(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText(/small padding/i)).toHaveClass('p-4');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText(/large padding/i)).toHaveClass('p-8');
  });

  it('handles interactive state', () => {
    const handleClick = vi.fn();
    render(
      <Card interactive onClick={handleClick}>
        Interactive card
      </Card>
    );
    
    const card = screen.getByText(/interactive card/i);
    expect(card).toHaveClass('cursor-pointer');
    
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with composition components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          Card content goes here
        </CardContent>
        <CardFooter>
          Card footer
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/card title/i)).toBeInTheDocument();
    expect(screen.getByText(/card description/i)).toBeInTheDocument();
    expect(screen.getByText(/card content goes here/i)).toBeInTheDocument();
    expect(screen.getByText(/card footer/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>);
    expect(screen.getByText(/custom card/i)).toHaveClass('custom-class');
  });

  it('renders CardTitle as h3 element', () => {
    render(<CardTitle>Test Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Title');
  });

  it('has proper semantic structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Accessible Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card follows accessibility best practices
        </CardContent>
      </Card>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });
});