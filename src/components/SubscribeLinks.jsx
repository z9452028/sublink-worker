/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

const BTN_BASE =
    'px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200';

const INPUT_CLS =
    'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm';

const QR_DATA = `{ copied: null, qrImg: '', qrUrl: '', openQR(u){ this.qrUrl = u; try { var q = qrcode(0, 'M'); q.addData(u, 'Byte'); q.make(); var m = q.getModuleCount(); var s = 8; var total = m + 8; var cv = document.createElement('canvas'); cv.width = cv.height = total * s; var cx = cv.getContext('2d'); cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, cv.width, cv.height); cx.fillStyle = '#000000'; for (var r = 0; r < m; r++) { for (var c = 0; c < m; c++) { if (q.isDark(r, c)) { cx.fillRect((c + 4) * s, (r + 4) * s, s, s); } } } this.qrImg = cv.toDataURL('image/png'); } catch (e) { this.qrImg = ''; this.qrUrl = 'QR error: ' + (e && e.message ? e.message : e); } }, closeQR(){ this.qrImg = ''; this.qrUrl = ''; }, downloadQR(){ if (!this.qrImg) return; var a = document.createElement('a'); a.download = 'subscription-qrcode.png'; a.href = this.qrImg; a.click(); } }`;

const LinkRow = (props) => {
    const { t, key, labelKey, value } = props;
    return (
        <div class="relative group">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t(labelKey)}
            </label>
            <div class="flex gap-2">
                <input type="text" readonly value={value} class={INPUT_CLS} />
                <button
                    type="button"
                    title={t('copy') || 'copy'}
                    x-on:click={`$clipboard('${value}'); copied = '${key}'; setTimeout(() => copied = null, 2000)`}
                    class={BTN_BASE}
                    x-bind:class={`{'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': copied === '${key}'}`}
                >
                    <i class="fas" x-bind:class={`copied === '${key}' ? 'fa-check' : 'fa-copy'`}></i>
                </button>
                <button
                    type="button"
                    title="二维码"
                    x-on:click={`openQR('${value}')`}
                    class={BTN_BASE}
                >
                    <i class="fas fa-qrcode"></i>
                </button>
            </div>
        </div>
    );
};

export const SubscribeLinks = (props) => {
    const { t, links } = props;
    if (!links) return null;
    return (
        <div x-data={QR_DATA} class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 transition-all duration-300 hover:shadow-md">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <span class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <i class="fas fa-link text-sm"></i>
                </span>
                {t('subscriptionLinks')}
            </h2>
            <div class="space-y-4">
                <LinkRow t={t} key="xray" labelKey="xrayLink" value={links.xray} />
                <LinkRow t={t} key="singbox" labelKey="singboxLink" value={links.singbox} />
                <LinkRow t={t} key="clash" labelKey="clashLink" value={links.clash} />
                <LinkRow t={t} key="surge" labelKey="surgeLink" value={links.surge} />
            </div>
            <div
                x-show="qrImg"
                x-cloak
                x-on:click="closeQR()"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            >
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl text-center" x-on:click="$event.stopPropagation()">
                    <img x-bind:src="qrImg" alt="QR" class="w-64 h-64 mx-auto rounded" />
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-3 break-all mx-auto" x-text="qrUrl"></div>
                    <div class="mt-4 flex justify-center gap-2">
                        <button
                            type="button"
                            x-on:click="downloadQR()"
                            class="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm"
                        >
                            下载 PNG
                        </button>
                        <button
                            type="button"
                            x-on:click="closeQR()"
                            class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm"
                        >
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
