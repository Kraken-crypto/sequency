# ![Sequencey](/sequency.png) [![Travic CI](https://travis-ci.org/Kraken-crypto/sequency.svg?branch=master)](https://travis-ci.org/Kraken-crypto/sequency)

> Type-safe functional sequences for processing iterable data in TypeScript and JavaScript.

![Sequencey](/sequency.gif)

---

**★★★ Like this project? [Leave a star](https://github.com/winterbe/sequency/stargazers) and [follow on Twitter](https://twitter.com/winterbe_)! Thanks. ★★★**

## About Sequency

Sequency is a lightweight (**5 KB minified**), intensely tested (**200+ tests, 99% coverage**), type-safe functional programming library for processing iterable data such as arrays, sets and maps. It's written in TypeScript, compiles to ES5-compatible JavaScript and works in all current browsers and Node applications. The API is inspired by [Sequences](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/) from the programming language [Kotlin](https://kotlinlang.org/).

> [Try Sequency](https://npm.runkit.com/sequency) right in your browser.

## Getting started

```bash
npm install --save sequency
```

Alternatively use Sequency from [CDN](https://unpkg.com/sequency/) by adding this to your HTML:

```html
<script src="https://unpkg.com/sequency"></script>
```

## How Sequency works

Sequency is centered around a single class called `Sequence` to process any kind of iterable data such as arrays, sets or maps. The API is inspired by [Kotlin](https://kotlinlang.org/) [Sequences](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/index.html).

Sequences can be created by utilizing one of the following functions:

```js
import {
    asSequence,
    sequenceOf, 
    emptySequence, 
    range,
    generateSequence,
    extendSequence
} from 'sequency';
```

- `sequenceOf` accepts one or many values and returns a new sequence.
- `asSequence` accepts an iterable (e.g. an array, set or map) and returns a new sequence.
- `emptySequence` returns a new empty sequence.
- `range` returns as number sequence consisting of all numbers between `startInclusive` and `endExclusive`.
- `generateSequence` returns a sequence generated from the given generator function.
- `extendSequence` allows extending sequences with user-defined operations (see [example](https://github.com/Kraken-crypto/sequency/blob/master/test/extendSequence.test.ts)).

Each `Sequence` provides a fluent functional API consisting of intermediate and terminal operations. Intermediate functions (e.g. `filter`, `map`, `sorted`) return a new sequence, thus enabling method chaining. Terminal functions (e.g. `toArray`, `groupBy`, `findLast`) return an arbitrary result. Detailed descriptions of all operations are available in the [API docs](https://kraken-crypto.github.io/sequency).

Sequences are **lazily evaluated** to avoid examining all of the input data when it's not necessary. Sequences always perform the minimal amount of operations to gain results. E.g. in a `filter - map - find` sequence both `map` and `find` are executed just one time before returning the single result.

## Architecture

### Core Components

**`Sequence<T>`** — The central interface of the library:

- Contains a single `iterator: Iterator<T>` property for lazy iteration
- Extends `SequenceOperators<T>`, which combines all operations
- Sequences can be iterated only once (single-pass)

**`SequenceImpl<T>`** — The concrete implementation using the **Mixin Pattern**:

- All operations are added dynamically via the `applyMixins()` function
- Each operation is implemented as a separate mixin class
- Enables modular code organization and easy addition of new operations

**`AsyncSequence<T>`** — Asynchronous version of the sequence:

- Uses `AsyncIterator<T>` instead of `Iterator<T>`
- All operations return `Promise`
- Follows the same Mixin architecture as the synchronous version

### Operation Types

**Intermediate Operations** — Return a new `Sequence<T>`, enabling method chaining:

- **Lazy evaluation** — executed only when necessary
- **Examples:** `map`, `filter`, `flatMap`, `take`, `drop`, `sorted`
- Create a new iterator wrapper around the source iterator without processing all elements at once

**Terminal Operations** — Return a concrete value and trigger chain execution:

- **Eager evaluation** — executed immediately
- **Examples:** `toArray`, `reduce`, `groupBy`, `count`, `first`, `last`
- Iterate the entire sequence (or until result is reached) and return the final result

### Architectural Patterns

1. **Mixin Pattern** — All operations are separate mixin classes dynamically added to the `SequenceImpl` prototype, ensuring modular code organization and extensibility via `extendSequence()`

2. **Iterator Pattern** — Uses native JavaScript `Iterator` protocol for lazy evaluation, uniform element access, and compatibility with native iterables

3. **Decorator Pattern** — Iterator wrappers (`MapIterator`, `FilterIterator`, `FlatMapIterator`) decorate the source iterator, adding new behavior without modifying the original object

4. **Fluent Interface** — Method chaining is enabled by intermediate operations returning a new `Sequence<T>`

### Architecture Benefits

1. **Lazy evaluation** — Minimal data processing, operations execute only when necessary
2. **Modularity** — Each operation in a separate file, easy to add new ones
3. **Type safety** — Full TypeScript support with type inference
4. **Extensibility** — Ability to add custom operations
5. **Performance** — Optimized iterator usage, no intermediate arrays

## API documentation

Full API documentation is available at [Sequency API docs](https://kraken-crypto.github.io/sequency).

Sequency is also fully documented via inline JSDoc comments. When using an IDE like Intellij IDEA or Webstorm the docs are available inline right inside your editor.

## Why Sequency?

I've built Sequency because I'm using Kotlin for server-side code but for some reasons still use TypeScript and JavaScript for client-side browser code. I find that using the same APIs for collection processing both on client and server is a huge gain in productivity for me.

## License

MIT © [winterbe](https://twitter.com/winterbe_)
