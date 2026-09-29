// Shared signal between the Preloader and the page reveal animations:
// reveals wait on `preloaderDone` so nothing animates hidden behind the
// loading screen.

let resolveDone: () => void = () => {};
let done = false;

export const preloaderDone = new Promise<void>((resolve) => {
  resolveDone = resolve;
});

export function markPreloaderDone() {
  if (done) return;
  done = true;
  resolveDone();
}

export const isPreloaderDone = () => done;
