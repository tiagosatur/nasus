import { SearchIcon } from "./icons";

/**
 * Barra de busca decorativa: o texto é "digitado" via GSAP (useSerpEntrance)
 * dentro de [data-type], com cursor em [data-caret]. O valor real fica em
 * .sr-only para leitores de tela, já que os spans animados são aria-hidden.
 */
export function SearchBar({ query }: { query: string }) {
  return (
    <div
      data-search
      className="flex items-center gap-[10px] w-full rounded-full border border-black/[0.08] bg-[var(--links-surface)] px-[18px] py-[12px] shadow-[var(--links-shadow-search)]"
    >
      <SearchIcon className="flex-none text-[var(--links-num)]" />
      <span className="text-[14.5px] leading-none text-text-primary">
        <span data-type aria-hidden="true" />
        <span data-caret aria-hidden="true" className="ml-px inline-block h-[15px] w-[1.5px] -mb-[2px] bg-accent align-middle" />
      </span>
      <span className="sr-only">{query}</span>
    </div>
  );
}
