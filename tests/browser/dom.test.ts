/// <reference types="vitest" />

describe('browser playground', () => {
  it('updates document title', () => {
    const title = 'Vitest Browser Mode';
    document.title = title;
    expect(document.title).toBe(title);
  });

  it('handles basic DOM interactions', () => {
    const button = document.createElement('button');
    button.textContent = 'Click me';

    let clicks = 0;
    button.addEventListener('click', () => {
      clicks += 1;
      button.dataset.clicked = 'true';
    });

    document.body.append(button);
    button.click();

    expect(clicks).toBe(1);
    expect(button.dataset.clicked).toBe('true');
  });
});
