import { p as e, b as t } from './index-69dec873.js';
export { s as setNonce } from './index-69dec873.js';
import { g as n } from './app-globals-0f993ce5.js';
(() => {
	const t = import.meta.url,
		n = {};
	return '' !== t && (n.resourcesUrl = new URL('.', t).href), e(n);
})().then(
	async (e) => (
		await n(),
		t(
			[
				[
					'fin-context-group-picker',
					[
						[
							1,
							'fin-context-group-picker',
							{
								bindViews: [4, 'bind-views'],
								bindSelf: [4, 'bind-self'],
								unselectedColor: [1, 'unselected-color'],
								unselectedLineColor: [1, 'unselected-line-color'],
								listDelay: [2, 'list-delay'],
								showListOnClick: [4, 'show-list-on-click'],
								unselectedText: [1, 'unselected-text'],
								selectedText: [1, 'selected-text'],
								joinText: [1, 'join-text'],
								leaveText: [1, 'leave-text'],
								contextGroupRefreshEventId: [1, 'context-group-refresh-event-id'],
								isQueryStringEnabled: [4, 'is-query-string-enabled'],
								isMonitoringEnabled: [4, 'is-monitoring-enabled'],
								showContextGroupList: [32],
								contextGroupId: [32]
							}
						]
					]
				]
			],
			e
		)
	)
);
