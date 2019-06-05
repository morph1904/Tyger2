import Vue from 'vue';
import ToastCmp from './Toast.vue';

const colors = ['success', 'info', 'error'];

export default class Toast
{

	constructor() {
		colors.forEach(color => (this[color] = (text, options = {}) => this.show({ color, text, ...options })));
		this.component = undefined;
	}

	getComponent() {
		if (!this.component) {
			const cmp = new Vue(ToastCmp);
			window.document.body.appendChild(cmp.$mount().$el);
			this.component = cmp
		}
		return this.component;
	}

	show(options) {
		this.getComponent().show({ ...Toast.defaultOptions, ...options });
	}

	close() {
		this.getComponent().close();
	}

	static get defaultOptions() {
		return {
			text: '',
			icon: '',
			color: 'info',
			timeout: 3000,
			dismissible: true,
		}
	}
}


