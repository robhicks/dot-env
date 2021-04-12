# dot-env

dot-env reads one or more .env files and adds the contents of them to process.env.

dot-env is not a drop-in replacement for (dotenv)[https://github.com/motdotla/dotenv], nor does pretend or want to be. I needed an es module version of dotenv for @sveltejs/kit project. So, I looked at the source code for dotenv and got a headache. dot-env is much simpler than dotenv. It doesn't contain a configure function. It is much smaller. It is available in both es module and cjs formats.

dot-env doesn't do everything dotenv does. But it does 99% of what dotenv does and it is importable. In addition, it will handle an array of .env files. Yes, I know. dotenv discourages using more than one. Oh well, some of us are rebels and 
prefer to split up huge .env files.

## Installation

```sh 
yarn add dot-env
```
or
```sh 
npm i dov-env -S
```

## Use

Use dot-env only once when you server code is loaded. dot-env is blocking. 

```JavaScript 
import dotenv from 'dot-env';

dotenv('.env');
```
or
```JavaScript 
const dotenv = require('dot-env');

dotenv('.env');
```

### Multiple .env files

Beware that order does matter. A second .env file that contains the same name key will overwrite any previous key with the same name. 

```JavaScript 
import dotenv from 'dot-env';
import { resolve } from 'path';

const root = process.cwd();
const dbEnv = resolve(root, '.env-db');
const appEnv = resolve(root, '.env');

dotenv([dbEnv, appEnv]);
```

