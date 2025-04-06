
/**
 * Creates an intersection observer to detect when elements are visible in viewport
 * @param threshold - Visibility threshold (0-1)
 * @param rootMargin - Margin around the root
 * @param onChange - Callback when visibility changes
 */
export const createIntersectionObserver = (
  threshold = 0.1,
  rootMargin = '0px',
  onChange: (entry: IntersectionObserverEntry) => void
) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        onChange(entry);
      });
    },
    { threshold, rootMargin }
  );
};

/**
 * Adds visibility classes to elements when they scroll into view
 * @param element - The element to observe
 * @param visibleClass - The class to add when visible
 * @param threshold - Visibility threshold
 */
export const createScrollAnimation = (
  element: HTMLElement,
  visibleClass = 'visible',
  threshold = 0.1
) => {
  const observer = createIntersectionObserver(
    threshold,
    '-100px',
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
      }
    }
  );
  
  observer.observe(element);
  return () => observer.disconnect();
};

/**
 * Apply staggered animations to child elements
 * @param parentElement - The parent element containing children to animate
 * @param childSelector - CSS selector for the children to animate
 * @param visibleClass - The class to add when visible
 * @param delayIncrement - Delay increment in milliseconds between each child
 */
export const createStaggeredAnimation = (
  parentElement: HTMLElement,
  childSelector: string,
  visibleClass = 'visible',
  delayIncrement = 200
) => {
  const children = Array.from(parentElement.querySelectorAll(childSelector));
  
  const observer = createIntersectionObserver(
    0.1,
    '-50px',
    (entry) => {
      if (entry.isIntersecting) {
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add(visibleClass);
          }, index * delayIncrement);
        });
        observer.unobserve(entry.target);
      }
    }
  );
  
  observer.observe(parentElement);
  return () => observer.disconnect();
};

/**
 * Create parallax effect on an element based on scroll position
 * @param element - The element to apply parallax to
 * @param speed - The speed of the parallax effect (1 = normal, 0.5 = half speed)
 */
export const createParallaxEffect = (element: HTMLElement, speed = 0.5) => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const offset = scrollTop * speed;
    element.style.transform = `translateY(${offset}px)`;
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};
