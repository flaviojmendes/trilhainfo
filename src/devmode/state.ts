import { useSyncExternalStore } from 'react';
import { installNetworkRecorder, uninstallNetworkRecorder } from './network';

const storageKey = 'trilha:dev-mode';
const listeners = new Set<() => void>();

function stored(): boolean {
  try {
    return localStorage.getItem(storageKey) === '1';
  } catch {
    return false;
  }
}

let enabled = typeof window !== 'undefined' && stored();

export function initDevMode() {
  if (enabled) installNetworkRecorder();
}

export function isDevMode(): boolean {
  return enabled;
}

export function setDevMode(next: boolean) {
  if (next === enabled) return;
  enabled = next;
  try {
    if (next) localStorage.setItem(storageKey, '1');
    else localStorage.removeItem(storageKey);
  } catch {
    // Without storage the mode still works until the page reloads.
  }
  if (next) installNetworkRecorder();
  else uninstallNetworkRecorder();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useDevMode(): boolean {
  return useSyncExternalStore(subscribe, isDevMode, () => false);
}
