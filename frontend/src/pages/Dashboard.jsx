import React from "react";

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
        GutenRead
      </h1>
      <p className="mt-6 text-base leading-8 text-slate-700">
        This page allows you to load books from the Gutenberg Project and read
        them together with friends.
      </p>
      <p className="mt-4 text-base leading-8 text-slate-700">
        For each section, an automatically generated chat room is created where
        you can discuss the previous sections live.
      </p>
    </section>
  );
}
