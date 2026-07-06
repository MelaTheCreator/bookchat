import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-8xl rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="flex flex-col items-center text-center gap-8 lg:flex-row lg:items-start lg:text-left">
        <div className="flex-shrink-10">
          <img
            src="/gutenTalkgelb.png"
            alt="GutenTalk yellow logo"
            className="h-128 w-128 rounded-3xl object-contain"
          />
        </div>
        <div className="space-y-6 lg:max-w-xl">
          <h1 className="text-4xl pt-6 font-semibold tracking-tight text-slate-900">
            GutenTalk
          </h1>
          <p className="text-base leading-8 text-slate-700">
            This page allows you to load books from the Gutenberg Project and
            read them together with friends.
          </p>
          <p className="text-base leading-8 text-slate-700">
            For each section, an automatically generated chat room is created
            where you can discuss the previous sections live.
          </p>
          <div>
            <Link
              to="/books"
              className="inline-flex rounded-full bg-[var(--color-yellow)] px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[var(--color-yellow-80)]"
            >
              Look for Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
