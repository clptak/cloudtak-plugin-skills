<template>
    <div class='d-flex flex-column h-100'>
        <div class='px-3 py-2 border-bottom'>
            <h3 class='card-title m-0'>__LABEL__</h3>
        </div>
        <div class='mx-3 my-3'>
            <TablerNone
                label='__LABEL__ is installed'
                :create='false'
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
// Self-contained on purpose: it imports nothing from CloudTAK's source tree, so it typechecks
// in the plugin repo and works when the repo is symlinked into the host during development.
//
// To match CloudTAK's own menu pages (header + back button), import the host's MenuTemplate
// through the '@' alias, which points at the web app's src/ in the host Vite config:
//   import MenuTemplate from '@/components/CloudTAK/util/MenuTemplate.vue';
// Do not use a relative path like '../../../../src/...': Vite resolves symlinks to their real
// location, so relative imports into the host break during development.
import { TablerNone } from '@tak-ps/vue-tabler';
</script>
