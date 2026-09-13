import { Link } from "@/i18n/navigation";
import { BookOpen } from "lucide-react";
import type { CollectionSummary } from "@/types/hadith";

interface HadithCollectionCardProps {
  collection: CollectionSummary;
  locale: string;
}

export function HadithCollectionCard({
  collection,
  locale,
}: HadithCollectionCardProps) {
  const isArabic = locale === "ar";
  const name = isArabic ? collection.name_ar : collection.name_en;
  const author = isArabic ? collection.author_ar : collection.author_en;

  // Type badge colors
  const typeBadge = {
    primary: { bg: "bg-primary/10", text: "text-primary", label: isArabic ? "الكتب الستة" : "Primary" },
    compilation: { bg: "bg-accent/10", text: "text-accent", label: isArabic ? "مختارات" : "Compilation" },
    dua: { bg: "bg-ink/10", text: "text-ink", label: isArabic ? "أدعية" : "Du'a" },
  }[collection.type];

  return (
    <Link
      href={`/hadith/${collection.id}`}
      className="group block rounded-lg border border-border bg-surface p-5 transition-all hover:border-primary hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-ink group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <p className="text-sm text-ink-muted mb-3">{author}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge.bg} ${typeBadge.text}`}>
              {typeBadge.label}
            </span>
            <span className="text-ink-muted">
              {collection.totalHadiths.toLocaleString(isArabic ? "ar" : "en")}{" "}
              {isArabic ? "حديث" : "hadiths"}
            </span>
            <span className="text-border">•</span>
            <span className="text-ink-muted">
              {collection.totalBooks}{" "}
              {isArabic ? "كتاب" : "books"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
