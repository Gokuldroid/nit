# nit

Git cmdline utils written in node.js

### Installation

`npm install -g @lazyloop/nit`

### usage

**help**

`nit -h` or `nit <command> -h`

**checkout branch:**

`nit checkout [-r<remote>]`

![demo git checkout](samples/nit_checkout.gif).

**delete branches:**

`nit delete [-m<multiple>]`

![demo git delete](samples/nit_delete.gif).

**stage files to commit:**

`nit add`

![demo git add](samples/nit_add.gif).

**discard local changes:**

`nit discard`

![demo git discard](samples/nit_discard.gif).
