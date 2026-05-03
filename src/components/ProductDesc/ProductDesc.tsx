export default function ProductDescription({ text }: { text: string }) {
    const lines = text.split("\n");

    const parseBold = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={i} className="font-semibold text-gray-700">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="space-y-1">
            {lines.map((line, i) => {
                const trimmed = line.trim();

                // Empty line → spacing
                if (!trimmed) return <div key={i} className="h-2" />;

                // ==== Divider
                if (/^={3,}$/.test(trimmed)) {
                    return (
                        <hr key={i} className="border-t border-gray-200 my-3" />
                    );
                }

                // ## Heading
                if (trimmed.startsWith("## ")) {
                    return (
                        <p key={i} className="font-bold text-gray-800 mt-3">
                            {trimmed.slice(3)}
                        </p>
                    );
                }

                // # Heading (h1)
                if (trimmed.startsWith("# ")) {
                    return (
                        <p key={i} className="font-bold text-gray-800 mt-3">
                            {trimmed.slice(2)}
                        </p>
                    );
                }

                // - Bullet point
                if (trimmed.startsWith("- ")) {
                    const content = trimmed.slice(2);
                    return (
                        <p key={i} className="text-gray-600 flex gap-1 pl-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{parseBold(content)}</span>
                        </p>
                    );
                }

                // Normal paragraph
                return (
                    <p key={i} className="text-gray-600 leading-relaxed">
                        {parseBold(trimmed)}
                    </p>
                );
            })}
        </div>
    );
}
