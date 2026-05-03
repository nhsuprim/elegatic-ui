const firedEvents = new Set<string>();

export const pixelEvent = (eventName: string, data?: object) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
        if (firedEvents.has(eventName)) return;

        firedEvents.add(eventName);

        (window as any).fbq("track", eventName, data);
    }
};
