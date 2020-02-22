There seems to be a bug with the Poseidon hash function bytecode generator in
`circomlib` 0.0.20.

To demonstrate this bug, clone this repository, install dependencies, and
compile the source code:

```bash
git clone https://github.com/weijiekoh/poseidon_bug.git && \
cd poseidon_bug && \
npm i && npm run build
```

In a separate terminal, run:

```bash
npm run ganache
```

Next, run:

```bash
node build/index.js
```

If the output is:

```
21334876322667183667165053088102559857160636052568525182000620475434027971580
21334876322667183667165053088102559857160636052568525182000620475434027971580
```

then there is a bug with the Poseidon hash contract bytecode generator.

The bug occurs when the `t` value is set to anything other than 6:

```js
poseidonGenContract.createCode(4, 8, 57, POSEIDON_SEED)
```

It returns the same value for any input, which should not be the case.

If set to 6, the contract's `poseidon()` function will return different hash
values for different inputs.
