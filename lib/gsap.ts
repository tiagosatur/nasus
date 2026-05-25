/**
 * Re-exports only the GSAP modules the site actually uses.
 * Tree-shaking drops anything a given component doesn't import.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export { gsap, ScrollTrigger, SplitText };
