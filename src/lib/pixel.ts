// const firedEvents = new Set<string>();

// export const pixelEvent = (eventName: string, data?: object) => {
//     if (typeof window !== "undefined" && (window as any).fbq) {
//         if (firedEvents.has(eventName)) return;

//         firedEvents.add(eventName);

//         (window as any).fbq("track", eventName, data);
//     }
// };

// Events যেগুলো বারবার fire হওয়া উচিত (transaction events)
const ALWAYS_FIRE_EVENTS = new Set([
    "Purchase",
    "AddToCart",
    "InitiateCheckout",
]);

const firedEvents = new Set<string>();

export const pixelEvent = (eventName: string, data?: object) => {
    if (typeof window === "undefined" || !(window as any).fbq) return;

    // Purchase/transaction events সবসময় fire হবে
    if (!ALWAYS_FIRE_EVENTS.has(eventName)) {
        if (firedEvents.has(eventName)) return;
        firedEvents.add(eventName);
    }

    (window as any).fbq("track", eventName, data);
};
