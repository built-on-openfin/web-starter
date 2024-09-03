import { r as t, h as i } from './index-69dec873.js';
let e = window.fin;
const s = class {
	constructor(i) {
		t(this, i),
			(this.iconColor = null),
			(this.iconId = null),
			(this.availableContextGroups = []),
			(this.showContextGroupList = !1),
			(this.contextGroupId = void 0),
			(this.bindViews = !0),
			(this.bindSelf = !0),
			(this.unselectedColor = '#ffffff'),
			(this.unselectedLineColor = '#000000'),
			(this.listDelay = 500),
			(this.showListOnClick = !0),
			(this.unselectedText = 'No Context Group Selected' + (this.showListOnClick ? '. Click To Join.' : '')),
			(this.selectedText =
				'Current Context Is {0}' + (this.showListOnClick ? '. Click To Switch/Leave.' : '')),
			(this.joinText = 'Switch to {0} Context Group'),
			(this.leaveText = 'Leave {0} Context Group'),
			(this.contextGroupRefreshEventId = 'refresh-context-group'),
			(this.isQueryStringEnabled = !1),
			(this.isMonitoringEnabled = !1);
	}
	async joinContextGroup(t, i) {
		if (void 0 !== e) {
			let s = !1;
			if (!0 === this.bindViews && (!0 === e.me.isWindow || e.me.isBrowserEnvironment()))
				if (void 0 === i) {
					let i = await this.getViews();
					for (let o = 0; o < i.length; o++)
						try {
							await e.me.interop.joinContextGroup(t, i[o]);
						} catch (t) {
							s = !0;
						}
				} else
					try {
						await e.me.interop.joinContextGroup(t, i);
					} catch (t) {
						s = !0;
					}
			if (this.bindSelf)
				try {
					await e.me.interop.joinContextGroup(t, e.me.identity);
				} catch (t) {
					s = !0;
				}
			s &&
				console.warn(
					'Error encountered when trying to join context group. This may be because one or more views or the window hosting the component is not connected to a broker.'
				);
		}
	}
	async leaveContextGroup(t) {
		if (void 0 !== e) {
			let i = !1;
			if (!0 === this.bindViews && (!0 === e.me.isWindow || e.me.isBrowserEnvironment()))
				if (void 0 === t) {
					let t = await this.getViews();
					for (let s = 0; s < t.length; s++)
						try {
							await e.me.interop.removeFromContextGroup(t[s]);
						} catch (t) {
							i = !0;
						}
				} else
					try {
						await e.me.interop.removeFromContextGroup(t);
					} catch (t) {
						i = !0;
					}
			if (this.bindSelf)
				try {
					await e.me.interop.removeFromContextGroup(e.me.identity);
				} catch (t) {
					i = !0;
				}
			i &&
				console.warn(
					'Error encountered when trying to leave context group. This may be because one or more views or the window hosting the component is not connected to a broker.'
				);
		}
	}
	async saveSelectedContextGroup(t) {
		!1 === this.bindSelf &&
			void 0 !== e.me.updateOptions &&
			(await e.me.updateOptions({ customData: { selectedContextGroup: t } }));
	}
	updateContextGroupIcon(t) {
		let i = this.availableContextGroups.find((i) => i.id === t);
		void 0 === i
			? ((this.contextGroupId = void 0), (this.iconColor = this.unselectedColor), (this.iconId = void 0))
			: ((this.iconColor = i.color), (this.iconId = i.id), (this.contextGroupId = t));
	}
	async updateContextGroup(t, i, e = !0) {
		if (null != this.availableContextGroups.find((i) => i.id === t)) {
			if (this.contextGroupId === t && e) this.updateContextGroupIcon(), await this.leaveContextGroup(i);
			else {
				let e = void 0 === this.contextGroupId;
				this.updateContextGroupIcon(t),
					e ? await this.joinContextGroup(t) : await this.joinContextGroup(t, i);
			}
			await this.saveSelectedContextGroup(this.contextGroupId), (this.showContextGroupList = !1);
		}
	}
	async getTargetContextGroup(t) {
		let i = [];
		if (void 0 !== t && this.bindSelf && !this.bindViews) i.push({ name: t });
		else if (this.bindViews) {
			const t = await this.getViews();
			i.push(...t);
		}
		if (i.length > 0) {
			const t = {};
			for (let s = 0; s < this.availableContextGroups.length; s++) {
				const o = this.availableContextGroups[s],
					n = await e.me.interop.getAllClientsInContextGroup(o.id);
				t[o.id] = 0;
				for (const e of i) if (n.some((t) => t.name === e.name) && (t[o.id]++, 1 === i.length)) break;
			}
			let s = this.contextGroupId,
				o = 0;
			for (const i in t) t[i] > o && ((o = t[i]), (s = i));
			return s;
		}
		return this.contextGroupId;
	}
	showContextList() {
		void 0 !== this.showListId && clearTimeout(this.showListId),
			(this.showListId = setTimeout(() => {
				(this.showContextGroupList = !0), (this.showListId = void 0);
			}, this.listDelay));
	}
	hideContextList() {
		this.showContextGroupList = !1;
	}
	getContextGroupTooltip(t, i = !1) {
		let e = t.charAt(0).toUpperCase() + t.slice(1);
		return i
			? this.selectedText.replace('{0}', e)
			: t === this.contextGroupId
				? this.leaveText.replace('{0}', e)
				: this.joinText.replace('{0}', e);
	}
	async getCurrentContextGroup() {
		let t;
		if (void 0 !== e.me.getOptions) {
			let i = await e.me.getOptions();
			void 0 !== i.interop && void 0 !== i.interop.currentContextGroup
				? (t = i.interop.currentContextGroup)
				: !1 === this.bindSelf &&
					void 0 !== i.customData &&
					void 0 !== i.customData.selectedContextGroup &&
					(t = i.customData.selectedContextGroup);
		} else
			t =
				void 0 !== window.fdc3
					? (await window.fdc3.getCurrentChannel()).id
					: await this.getTargetContextGroup(e.me.identity.name);
		return t;
	}
	async setupContextPicker() {
		if (void 0 !== e) {
			if (
				(this.bindViews &&
					!0 === e.me.isWindow &&
					(await e.Window.getCurrent()).on('view-attached', async (t) => {
						if (void 0 !== this.contextGroupId)
							setTimeout(async () => {
								await this.updateContextGroup(this.contextGroupId, t.viewIdentity, !1);
							}, 1e3);
						else {
							let i = e.View.wrapSync(t.viewIdentity),
								s = await i.getOptions();
							void 0 !== s.interop &&
								void 0 !== s.interop.currentContextGroup &&
								(await this.updateContextGroup(s.interop.currentContextGroup, t.viewIdentity));
						}
					}),
				(await e.me.interop.getContextGroups()).forEach((t) => {
					this.availableContextGroups.push({ id: t.id, color: t.displayMetadata.color });
				}),
				this.isQueryStringEnabled)
			) {
				const t = new URLSearchParams(window.location.search).get('contextGroupId');
				null != t &&
					setTimeout(async () => {
						await this.updateContextGroup(t);
					}, 1e3);
			}
			void 0 === this.contextGroupId &&
				setTimeout(async () => {
					let t = await this.getCurrentContextGroup();
					await this.updateContextGroup(t);
				}, 1e3),
				this.isMonitoringEnabled &&
					setInterval(async () => {
						let t;
						this.bindSelf
							? (t = await this.getCurrentContextGroup())
							: this.bindViews && (t = await this.getTargetContextGroup()),
							void 0 !== t && this.updateContextGroupIcon(t);
					}, 2e3),
				this.bindViews &&
					!this.bindSelf &&
					setTimeout(async () => {
						const t = await this.getTargetContextGroup();
						this.contextGroupId !== t && (await this.updateContextGroup(t)),
							window.addEventListener(this.contextGroupRefreshEventId, async (t) => {
								setTimeout(async () => {
									if (null != t.detail && null != t.detail.contextGroupId)
										this.updateContextGroupIcon(t.detail.contextGroupId);
									else {
										const t = await this.getTargetContextGroup();
										this.updateContextGroupIcon(t);
									}
								}, 1e3);
							});
					}, 1e3);
		}
	}
	async getViews() {
		let t = [];
		try {
			if ((e.me.isWindow || e.me.isBrowserEnvironment()) && this.bindViews) {
				let i = e.Platform.Layout.getCurrentSync();
				t = (await i.getCurrentViews()).map((t) => t.identity);
			} else
				!0 === this.bindSelf &&
					!1 === this.bindViews &&
					(console.warn("getViews shouldn't be called if bindViews is false and bindSelf is true."),
					t.push(e.me.identity));
		} catch (t) {
			console.error(
				'Error encountered when trying to get views. There was an error retrieving the views from the layout.',
				t
			);
		}
		return t;
	}
	componentWillLoad() {
		void 0 !== e
			? this.setupContextPicker().then(() => {})
			: addEventListener('finReady', async () => {
					void 0 !== window.fin && ((e = window.fin), this.setupContextPicker().then(() => {}));
				});
	}
	render() {
		return this.showContextGroupList
			? i(
					'div',
					{ id: 'available-context', onMouseLeave: this.hideContextList.bind(this) },
					' ',
					this.availableContextGroups.map((t) =>
						i(
							'span',
							{
								title: this.getContextGroupTooltip(t.id),
								class: 'fade-in',
								style: { padding: '0px 5px', color: t.color, cursor: 'pointer' },
								onClick: () => this.updateContextGroup(t.id)
							},
							'⬤'
						)
					)
				)
			: void 0 === this.contextGroupId
				? i(
						'div',
						null,
						i(
							'span',
							this.showListOnClick
								? {
										onClick: this.showContextList.bind(this),
										title: this.unselectedText,
										style: {
											padding: '0px 5px',
											color: `${this.unselectedColor}`,
											position: 'relative',
											display: 'inline-block'
										}
									}
								: {
										onMouseEnter: this.showContextList.bind(this),
										title: this.unselectedText,
										style: {
											padding: '0px 5px',
											color: `${this.unselectedColor}`,
											position: 'relative',
											display: 'inline-block'
										}
									},
							'⬤',
							i('span', {
								style: {
									content: '""',
									position: 'absolute',
									width: '2px',
									height: '87%',
									backgroundColor: `${this.unselectedLineColor}`,
									top: '-2px',
									left: '27%',
									transform: 'rotate(45deg)',
									transformOrigin: 'left bottom'
								}
							})
						)
					)
				: i(
						'div',
						{ id: 'selected-context' },
						i(
							'span',
							this.showListOnClick
								? {
										onClick: this.showContextList.bind(this),
										title: this.getContextGroupTooltip(this.contextGroupId, !0),
										style: { padding: '0px 5px', color: `${this.iconColor}` }
									}
								: {
										onMouseEnter: this.showContextList.bind(this),
										title: this.getContextGroupTooltip(this.contextGroupId, !0),
										style: { padding: '0px 5px', color: `${this.iconColor}` }
									},
							'⬤'
						)
					);
	}
};
s.style =
	':host{display:block}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.fade-in{animation:fadeIn ease 1s}';
export { s as fin_context_group_picker };
