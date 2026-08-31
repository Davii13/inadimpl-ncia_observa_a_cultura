import { useRef, useEffect, useCallback } from 'react';

/**
 * Permite arrastar horizontalmente um container com overflow (click-and-hold + move)
 * sem precisar alcançar a scrollbar. Ignora cliques em elementos interativos
 * (botões, inputs, links) para não atrapalhar ações normais dentro da tabela.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const onMouseDown = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea')) return;

    state.current.isDown = true;
    state.current.moved = false;
    state.current.startX = e.pageX - el.offsetLeft;
    state.current.scrollLeft = el.scrollLeft;
    el.classList.add('dragging');
  }, []);

  const onMouseLeaveOrUp = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = false;
    el.classList.remove('dragging');
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - state.current.startX;
    if (Math.abs(walk) > 3) state.current.moved = true;
    el.scrollLeft = state.current.scrollLeft - walk;
  }, []);

  // Suprime o clique-fantasma que dispararia após um arraste (ex: expandir linha sem querer).
  const onClickCapture = useCallback((e: MouseEvent) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeaveOrUp);
    el.addEventListener('mouseup', onMouseLeaveOrUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeaveOrUp);
      el.removeEventListener('mouseup', onMouseLeaveOrUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, [onMouseDown, onMouseLeaveOrUp, onMouseMove, onClickCapture]);

  return ref;
}
