# Locomotive Scroll Integration

This module provides a complete Locomotive Scroll integration for smooth scrolling and scroll-based animations.

## Components

### `LocomotiveScrollProvider`
Wraps your app to enable smooth scrolling.

```tsx
import { LocomotiveScrollProvider } from '@/components/locomotive-scroll';

<LocomotiveScrollProvider
  options={{
    smooth: true,
    smoothMobile: false,
    multiplier: 1,
  }}
>
  {children}
</LocomotiveScrollProvider>
```

## Hooks

### `useLocomotiveScroll()`
Access the scroll instance and ready state.

```tsx
const { scroll, isReady } = useLocomotiveScroll();
```

### `useScrollTrigger(callback, deps)`
Trigger animations based on scroll position.

```tsx
const elementRef = useScrollTrigger(({ progress, isInViewport }) => {
  // Your animation logic
}, []);
```

### `useParallax(speed)`
Create parallax effects.

```tsx
const elementRef = useParallax(0.5); // Speed multiplier
```

### `useFadeIn(threshold)`
Fade in elements on scroll.

```tsx
const elementRef = useFadeIn(0.2); // Trigger at 20% visibility
```

### `useScaleIn(threshold)`
Scale in elements on scroll.

```tsx
const elementRef = useScaleIn(0.3); // Trigger at 30% visibility
```

### `useSmoothScrollTo()`
Programmatically scroll to elements.

```tsx
const scrollTo = useSmoothScrollTo();
scrollTo('#section', { offset: -100, duration: 1000 });
```

## Data Attributes

### Basic Setup
```html
<section data-scroll-section>
  <div data-scroll data-scroll-speed="0.5">
    Parallax element
  </div>
</section>
```

### Animation Triggers
```html
<div
  data-scroll
  data-scroll-class="is-reveal"
  data-scroll-target="#container"
>
  Animated content
</div>
```

### Speed Options
- `data-scroll-speed="0.5"` - Slower than normal scroll
- `data-scroll-speed="2"` - Faster than normal scroll
- `data-scroll-speed="-0.5"` - Reverse direction

### Direction Options
- `data-scroll-direction="horizontal"` - Horizontal parallax
- `data-scroll-direction="vertical"` - Vertical parallax (default)

## Performance Tips

1. **Disable on Mobile**: Set `smoothMobile: false` for better performance
2. **Use will-change**: CSS automatically applied for performance
3. **Optimize Images**: Use proper image formats and sizes
4. **Limit Animated Elements**: Don't animate too many elements simultaneously

## Example Usage

```tsx
import { useFadeIn, useParallax } from '@/components/locomotive-scroll';

const MyComponent = () => {
  const fadeRef = useFadeIn(0.2);
  const parallaxRef = useParallax(0.3);

  return (
    <section data-scroll-section>
      <div ref={fadeRef} className="fade-element">
        This will fade in on scroll
      </div>
      <div ref={parallaxRef} className="parallax-element">
        This will move with parallax effect
      </div>
    </section>
  );
};
```

## Troubleshooting

### Scroll Not Working
- Ensure `LocomotiveScrollProvider` wraps your app
- Check that elements have `data-scroll-section`
- Verify CSS imports are loaded

### Performance Issues
- Reduce the number of animated elements
- Disable smooth scrolling on mobile
- Use `will-change: transform` sparingly

### Layout Issues
- Make sure parent containers have proper height
- Check for conflicting CSS overflow properties
- Ensure z-index layers are correct