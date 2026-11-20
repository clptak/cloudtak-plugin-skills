# CloudTAK plugins

Plugins that add features to [CloudTAK](https://github.com/dfpc-coe/CloudTAK). A plugin is
installed on a CloudTAK server by its administrator and is available to everyone on that server.

> **Before you install:** some plugins require patches to the core CloudTAK code. Each plugin, and
> any patch it needs, is maintained by its author. The CloudTAK project is not responsible for
> plugins or patches. Read a plugin's README, and test it on a non-production server, before
> installing it.

| Plugin | What it does | Author | Link |
|---|---|---|---|
| CalTopo Sync | Pair CalTopo maps with TAK missions, synced through the CloudTAK CalTopo ETL | clptak | [cloudtak-plugin-caltopo-sync](https://github.com/clptak/cloudtak-plugin-caltopo-sync) |
| Cellphone / Ping | Ping cellphones and show the results on the map | clptak | [cloudtak-plugin-cellphone](https://github.com/clptak/cloudtak-plugin-cellphone) |
| D4H | Connect CloudTAK with D4H | clptak | [cloudtak-plugin-d4h](https://github.com/clptak/cloudtak-plugin-d4h) |
| Dispatcher | Dispatch and track calls in CloudTAK | takwerx | [cloudtak-dispatcher-plugin](https://github.com/takwerx/cloudtak-dispatcher-plugin) |
| Incident Manager | Create and track incidents in CloudTAK | clptak | [cloudtak-plugin-incident-manager](https://github.com/clptak/cloudtak-plugin-incident-manager) |
| LiveWX Radar | Live NEXRAD radar, Blitzortung lightning, and NWS watches and warnings | ValleyTacticalSolutions | [cloudtak-plugin-livewx](https://github.com/ValleyTacticalSolutions/cloudtak-plugin-livewx) |
| Locator | Cellphone ping and TAK Portal SMS locator | clptak | [cloudtak-plugin-locator](https://github.com/clptak/cloudtak-plugin-locator) |
| Location Search | Search addresses from openaddresses.io and jump to them on the map | clptak | [cloudtak-plugin-location-search](https://github.com/clptak/cloudtak-plugin-location-search) |
| Measure | Measure distance and bearing along a line, with an optional terrain profile | clptak | [cloudtak-plugin-measure](https://github.com/clptak/cloudtak-plugin-measure) |
| Preplans | Copy preplans from a Preplan Library Data Sync into any mission as new map objects | clptak | [cloudtak-plugin-preplans](https://github.com/clptak/cloudtak-plugin-preplans) |
| Print | Print maps from CloudTAK at a set scale, with grid and declination | clptak | [cloudtak-plugin-print](https://github.com/clptak/cloudtak-plugin-print) |
| Quick Point Dropper | Drop and edit map points from icon packs, with shared favorites | ValleyTacticalSolutions | [cloudtak-plugin-quick-point-dropper](https://github.com/ValleyTacticalSolutions/cloudtak-plugin-quick-point-dropper) |
| Replay | Record and play back CoT traffic for training and after-action review | dfndr13 | [cloudtak-replay-plugin](https://github.com/dfndr13/cloudtak-replay-plugin) |
| Rubber Sheet | Stretch an image or PDF over the map and export KMZ, GeoTIFF or GeoPDF | ValleyTacticalSolutions | [cloudtak-plugin-rubbersheet](https://github.com/ValleyTacticalSolutions/cloudtak-plugin-rubbersheet) |
| Schedule | SAR on-call schedule calendar | clptak | [cloudtak-plugin-schedule](https://github.com/clptak/cloudtak-plugin-schedule) |
| Search Containment | Find trail-network containment points on a search boundary | clptak | [cloudtak-plugin-search-containment](https://github.com/clptak/cloudtak-plugin-search-containment) |
| Sidebar Configurator | Lets system admins set the default main-menu order and visibility | ValleyTacticalSolutions | [cloudtak-plugin-sidebar-configurator](https://github.com/ValleyTacticalSolutions/cloudtak-plugin-sidebar-configurator) |
| Skydio | Skydio Cloud: flight telemetry, missions from map objects, alerts and Data Sync log entries | clptak | [cloudtak-plugin-skydio](https://github.com/clptak/cloudtak-plugin-skydio) |
| Somewear | Bring Somewear messages and waypoints into TAK mission logs and the map | clptak | [cloudtak-plugin-somewear](https://github.com/clptak/cloudtak-plugin-somewear) |

## Building your own

See [README.md](README.md) for the instructions used to build these plugins with an AI coding
assistant.
