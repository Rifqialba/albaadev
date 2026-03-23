// src/components/Projects.tsx
import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For, Show } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  data: CollectionEntry<"projects">[]
  itemsPerPage?: number
}

export default function Projects({ data, tags, itemsPerPage = 5 }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [filteredProjects, setFilteredProjects] = createSignal<CollectionEntry<"projects">[]>([])
  const [currentPage, setCurrentPage] = createSignal(1)
  const [paginatedProjects, setPaginatedProjects] = createSignal<CollectionEntry<"projects">[]>([])

  // Hitung total halaman berdasarkan data yang sudah difilter
  const totalPages = () => Math.ceil(filteredProjects().length / itemsPerPage)

  // Update filtered projects ketika filter berubah
  createEffect(() => {
    const filtered = data.filter((entry) => 
      Array.from(filter()).every((value) => 
        entry.data.tags.some((tag: string) => 
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    )
    setFilteredProjects(filtered)
    // Reset ke halaman pertama ketika filter berubah
    setCurrentPage(1)
  })

  // Update paginated projects ketika filteredProjects atau currentPage berubah
  createEffect(() => {
    const start = (currentPage() - 1) * itemsPerPage
    const end = start + itemsPerPage
    setPaginatedProjects(filteredProjects().slice(start, end))
  })

  function toggleTag(tag: string) {
    setFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages()) {
      setCurrentPage(page)
      // Scroll ke atas halaman
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goToPrevPage() {
    goToPage(currentPage() - 1)
  }

  function goToNextPage() {
    goToPage(currentPage() + 1)
  }

  // Generate array halaman untuk pagination
  const getPageNumbers = () => {
    const total = totalPages()
    const current = currentPage()
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Sidebar Filter */}
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button 
                    onClick={() => toggleTag(tag)} 
                    class={cn(
                      "w-full px-2 py-1 rounded", 
                      "whitespace-nowrap overflow-hidden overflow-ellipsis", 
                      "flex gap-2 items-center", 
                      "bg-black/5 dark:bg-white/10", 
                      "hover:bg-black/10 hover:dark:bg-white/15", 
                      "transition-colors duration-300 ease-in-out", 
                      filter().has(tag) && "text-black dark:text-white"
                    )}
                  >
                    <svg class={cn(
                      "size-5 fill-black/50 dark:fill-white/50", 
                      "transition-colors duration-300 ease-in-out", 
                      filter().has(tag) && "fill-black dark:fill-white"
                    )}>
                      <use href={`/ui.svg#square`} class={cn(!filter().has(tag) ? "block" : "hidden")} />
                      <use href={`/ui.svg#square-check`} class={cn(filter().has(tag) ? "block" : "hidden")} />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {paginatedProjects().length} OF {filteredProjects().length} PROJECTS
          </div>
          
          {/* List Projects */}
          <ul class="flex flex-col gap-3">
            <For each={paginatedProjects()}>
              {(project) => (
                <li>
                  <ArrowCard entry={project} />
                </li>
              )}
            </For>
          </ul>

          {/* Pagination Component */}
          <Show when={totalPages() > 1}>
            <div class="mt-8">
              <div class="flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage() === 1}
                  class={cn(
                    "px-3 py-2 rounded border transition-colors",
                    currentPage() > 1 
                      ? "border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 cursor-pointer"
                      : "border-black/15 dark:border-white/15 opacity-50 cursor-not-allowed"
                  )}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div class="flex gap-1">
                  <For each={getPageNumbers()}>
                    {(page) => (
                      <Show
                        when={page !== '...'}
                        fallback={<span class="px-2 py-2">...</span>}
                      >
                        <button
                          onClick={() => goToPage(page as number)}
                          class={cn(
                            "px-3 py-2 rounded border transition-colors",
                            currentPage() === page
                              ? "bg-black text-white dark:bg-white dark:text-black border-black/25 dark:border-white/25"
                              : "border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15"
                          )}
                        >
                          {page}
                        </button>
                      </Show>
                    )}
                  </For>
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage() === totalPages()}
                  class={cn(
                    "px-3 py-2 rounded border transition-colors",
                    currentPage() < totalPages() 
                      ? "border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 cursor-pointer"
                      : "border-black/15 dark:border-white/15 opacity-50 cursor-not-allowed"
                  )}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Info Halaman */}
              <div class="text-center mt-4 text-sm text-black/60 dark:text-white/60">
                Page {currentPage()} of {totalPages()}
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
}