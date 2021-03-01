
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function (firebase) {
    'use strict';

    firebase = firebase && firebase.hasOwnProperty('default') ? firebase['default'] : firebase;

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            $$.fragment && $$.fragment.p($$.ctx, $$.dirty);
            $$.dirty = [-1];
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* node_modules\sveltefire\src\FirebaseApp.svelte generated by Svelte v3.16.3 */

    const { Error: Error_1 } = globals;

    // (39:0) {#if ready}
    function create_if_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 32) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[5], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(39:0) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ready*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { firebase } = $$props;
    	let { perf = false } = $$props;
    	let { analytics = false } = $$props;
    	let ready = false;
    	const dispatch = createEventDispatcher();
    	firebase = firebase || window.firebase;
    	setContext("firebase", firebase);

    	onMount(() => {
    		if (!firebase) {
    			throw Error("No firebase app was provided. You must provide an initialized Firebase app or make it available globally.");
    		} else {
    			perf && firebase.performance();
    			analytics && firebase.analytics();
    			dispatch("initializeApp", { firebase });
    			$$invalidate(0, ready = true);
    		}
    	});

    	const writable_props = ["firebase", "perf", "analytics"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FirebaseApp> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("firebase" in $$props) $$invalidate(1, firebase = $$props.firebase);
    		if ("perf" in $$props) $$invalidate(2, perf = $$props.perf);
    		if ("analytics" in $$props) $$invalidate(3, analytics = $$props.analytics);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { firebase, perf, analytics, ready };
    	};

    	$$self.$inject_state = $$props => {
    		if ("firebase" in $$props) $$invalidate(1, firebase = $$props.firebase);
    		if ("perf" in $$props) $$invalidate(2, perf = $$props.perf);
    		if ("analytics" in $$props) $$invalidate(3, analytics = $$props.analytics);
    		if ("ready" in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	return [ready, firebase, perf, analytics, dispatch, $$scope, $$slots];
    }

    class FirebaseApp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { firebase: 1, perf: 2, analytics: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FirebaseApp",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*firebase*/ ctx[1] === undefined && !("firebase" in props)) {
    			console.warn("<FirebaseApp> was created without expected prop 'firebase'");
    		}
    	}

    	get firebase() {
    		throw new Error_1("<FirebaseApp>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set firebase(value) {
    		throw new Error_1("<FirebaseApp>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get perf() {
    		throw new Error_1("<FirebaseApp>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set perf(value) {
    		throw new Error_1("<FirebaseApp>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get analytics() {
    		throw new Error_1("<FirebaseApp>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set analytics(value) {
    		throw new Error_1("<FirebaseApp>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function getApp() {
      return getContext('firebase');
    }

    // Validates end-user has setup context and imported proper modules into the Svelte app
    function assertApp(pkg) {

        const app = getApp();

        if (!app) {
          throw new Error(`Missing Firebase app in context. Are you inside a 'FirebaseApp' component?`)
        }

        if (pkg) {
            const pkgFn = app[pkg]; 
            if (!pkgFn || !pkgFn()) {
              throw new Error(`Firebase ${pkg} not found. You may be missing "import 'firebase/${pkg}'" `)
            } else {
              return pkgFn();
            }
        } else {
          return app;
        }
    }

    function userStore(opts = { persist: null }) {

        const auth = assertApp('auth');
        const k = 'sveltefire_user';
        let cached = null;
      
        const { persist } = opts;
      
        if (persist) {
          cached = JSON.parse(opts.persist.getItem(k));
        }
      
        const store = writable(cached, () => {
          const teardown = auth.onAuthStateChanged(u => {
            set(u);
            persist && opts.persist.setItem(k, JSON.stringify(u));
          });
          return () => teardown;
        });
      
        const { subscribe, set } = store;
      
        return {
          subscribe,
          auth
        };
      }

    /* node_modules\sveltefire\src\User.svelte generated by Svelte v3.16.3 */
    const get_after_slot_changes = dirty => ({ user: dirty & /*$store*/ 1 });

    const get_after_slot_context = ctx => ({
    	user: /*$store*/ ctx[0],
    	auth: /*store*/ ctx[1].auth
    });

    const get_signed_out_slot_changes = dirty => ({ user: dirty & /*$store*/ 1 });

    const get_signed_out_slot_context = ctx => ({
    	user: /*$store*/ ctx[0],
    	auth: /*store*/ ctx[1].auth
    });

    const get_default_slot_changes = dirty => ({ user: dirty & /*$store*/ 1 });

    const get_default_slot_context = ctx => ({
    	user: /*$store*/ ctx[0],
    	auth: /*store*/ ctx[1].auth
    });

    const get_before_slot_changes = dirty => ({ user: dirty & /*$store*/ 1 });

    const get_before_slot_context = ctx => ({
    	user: /*$store*/ ctx[0],
    	auth: /*store*/ ctx[1].auth
    });

    // (24:0) {:else}
    function create_else_block(ctx) {
    	let current;
    	const signed_out_slot_template = /*$$slots*/ ctx[6]["signed-out"];
    	const signed_out_slot = create_slot(signed_out_slot_template, ctx, /*$$scope*/ ctx[5], get_signed_out_slot_context);

    	const block = {
    		c: function create() {
    			if (signed_out_slot) signed_out_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (signed_out_slot) {
    				signed_out_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (signed_out_slot && signed_out_slot.p && dirty & /*$$scope, $store*/ 33) {
    				signed_out_slot.p(get_slot_context(signed_out_slot_template, ctx, /*$$scope*/ ctx[5], get_signed_out_slot_context), get_slot_changes(signed_out_slot_template, /*$$scope*/ ctx[5], dirty, get_signed_out_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(signed_out_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(signed_out_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (signed_out_slot) signed_out_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(24:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (22:0) {#if $store}
    function create_if_block$1(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope, $store*/ 33) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context), get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, get_default_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(22:0) {#if $store}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t0;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let current;
    	const before_slot_template = /*$$slots*/ ctx[6].before;
    	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[5], get_before_slot_context);
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$store*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	const after_slot_template = /*$$slots*/ ctx[6].after;
    	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[5], get_after_slot_context);

    	const block = {
    		c: function create() {
    			if (before_slot) before_slot.c();
    			t0 = space();
    			if_block.c();
    			t1 = space();
    			if (after_slot) after_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (before_slot) {
    				before_slot.m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (after_slot) {
    				after_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (before_slot && before_slot.p && dirty & /*$$scope, $store*/ 33) {
    				before_slot.p(get_slot_context(before_slot_template, ctx, /*$$scope*/ ctx[5], get_before_slot_context), get_slot_changes(before_slot_template, /*$$scope*/ ctx[5], dirty, get_before_slot_changes));
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(t1.parentNode, t1);
    			}

    			if (after_slot && after_slot.p && dirty & /*$$scope, $store*/ 33) {
    				after_slot.p(get_slot_context(after_slot_template, ctx, /*$$scope*/ ctx[5], get_after_slot_context), get_slot_changes(after_slot_template, /*$$scope*/ ctx[5], dirty, get_after_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(before_slot, local);
    			transition_in(if_block);
    			transition_in(after_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(before_slot, local);
    			transition_out(if_block);
    			transition_out(after_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (before_slot) before_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t1);
    			if (after_slot) after_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $store;
    	let { persist = null } = $$props;
    	let store = userStore({ persist });
    	validate_store(store, "store");
    	component_subscribe($$self, store, value => $$invalidate(0, $store = value));
    	const dispatch = createEventDispatcher();
    	let unsub;

    	onMount(() => {
    		unsub = store.subscribe(user => {
    			dispatch("user", { user });
    		});
    	});

    	onDestroy(() => unsub());
    	const writable_props = ["persist"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<User> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("persist" in $$props) $$invalidate(2, persist = $$props.persist);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { persist, store, unsub, $store };
    	};

    	$$self.$inject_state = $$props => {
    		if ("persist" in $$props) $$invalidate(2, persist = $$props.persist);
    		if ("store" in $$props) $$invalidate(1, store = $$props.store);
    		if ("unsub" in $$props) unsub = $$props.unsub;
    		if ("$store" in $$props) store.set($store = $$props.$store);
    	};

    	return [$store, store, persist, unsub, dispatch, $$scope, $$slots];
    }

    class User extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { persist: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "User",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get persist() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set persist(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function startTrace(name) {
        const perf = assertApp('performance');
        const trace = perf.trace(name);
        trace.start();
        return trace;
      }
      
      async function stopTrace(trace) {
        if (trace.state === 2) {
          trace.stop();
        }
      
        return null;
      }

    // Svelte Store for Firestore Document
    function docStore(path, opts) {
      const firestore = assertApp('firestore');

      const { startWith, log, traceId, maxWait, once } = { maxWait: 10000, ...opts };

      // Create the Firestore Reference
      const ref = typeof path === 'string' ? firestore.doc(path) : path;

      // Performance trace
      const trace = traceId && startTrace(traceId);

      // Internal state
      let _loading = typeof startWith !== undefined;
      let _firstValue = true;
      let _error = null;
      let _teardown;
      let _waitForIt;


      // State should never change without emitting a new value
      // Clears loading state on first call
      const next = (val, err) => {
        _loading = false; 
        _firstValue = false;
        _waitForIt && clearTimeout(_waitForIt);
        _error = err || null;
        set(val);
        trace && stopTrace(trace);
      };

      // Timout
      // Runs of first subscription
      const start = () => {

        // Timout for fallback slot
        _waitForIt = maxWait && setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`) ), maxWait);

        // Realtime firebase subscription
        _teardown = ref.onSnapshot(
          snapshot => {
            const data = snapshot.data() || (_firstValue && startWith) || null;

            // Optional logging
            if (log) {
              console.groupCollapsed(`Doc ${snapshot.id}`);
              console.log(`Path: ${ref.path}`);
              console.log('Snapshot:', snapshot);
              console.groupEnd();
            }

            // Emit next value
            next(data);

            // Teardown after first emitted value if once
            once && _teardown();
          },

          // Handle firebase thrown errors
          error => {
            console.error(error);
            next(null, error);
          }
        );

        // Removes firebase listener when store completes
        return () => _teardown();
      };

      // Svelte store
      const store = writable(startWith, start);
      const { subscribe, set } = store;

      return {
        subscribe,
        firestore,
        ref,
        get loading() {
          return _loading;
        },
        get error() {
          return _error;
        }
      };
    }

    // Svelte Store for Firestore Collection
    function collectionStore(path, queryFn, opts) {
      const firestore = assertApp('firestore');

      const { startWith, log, traceId, maxWait, once, idField, refField } = {
        idField: 'id',
        refField: 'ref',
        maxWait: 10000,
        ...opts
      };

      const ref = typeof path === 'string' ? firestore.collection(path) : path;
      const query = queryFn && queryFn(ref);
      const trace = traceId && startTrace(traceId);

      let _loading = typeof startWith !== undefined;
      let _error = null;
      let _meta = {};
      let _teardown;
      let _waitForIt;

      // Metadata for result
      const calcMeta = (val) => {
        return val && val.length ? 
          { first: val[0], last: val[val.length - 1] } : {}
      };

      const next = (val, err) => {
        _loading = false; 
        _waitForIt && clearTimeout(_waitForIt);
        _error = err || null;
        _meta = calcMeta(val);
        set(val);
        trace && stopTrace(trace);
      };

      const start = () => {
        _waitForIt = maxWait && setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`) ), maxWait);

        _teardown = (query || ref).onSnapshot(
          snapshot => {

            // Will always return an array
            const data = snapshot.docs.map(docSnap => ({
              ...docSnap.data(),
              // Allow end user override fields mapped for ID and Ref
              ...(idField ? { [idField]: docSnap.id } : null),
              ...(refField ? { [refField]: docSnap.ref } : null)
            }));

            if (log) {
              const type = _loading ? 'New Query' : 'Updated Query';
              console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
              console.log(`${ref.path}`);
              console.log(`Snapshot: `, snapshot);
              console.groupEnd();
            }
            next(data);
            once && _teardown();
          },

          error => {
            console.error(error);
            next(null, error);
          }
        );

        return () => _teardown();
      };

      const store = writable(startWith, start);
      const { subscribe, set } = store;

      return {
        subscribe,
        firestore,
        ref,
        get loading() {
          return _loading;
        },
        get error() {
          return _error;
        },
        get meta() {
          return _meta;
        }
      };
    }

    /* node_modules\sveltefire\src\Doc.svelte generated by Svelte v3.16.3 */

    const get_after_slot_changes$1 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1
    });

    const get_after_slot_context$1 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error
    });

    const get_fallback_slot_changes = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1
    });

    const get_fallback_slot_context = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error
    });

    const get_loading_slot_changes = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1
    });

    const get_loading_slot_context = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error
    });

    const get_default_slot_changes$1 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1
    });

    const get_default_slot_context$1 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error
    });

    const get_before_slot_changes$1 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1
    });

    const get_before_slot_context$1 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error
    });

    // (52:0) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const fallback_slot_template = /*$$slots*/ ctx[12].fallback;
    	const fallback_slot = create_slot(fallback_slot_template, ctx, /*$$scope*/ ctx[11], get_fallback_slot_context);

    	const block = {
    		c: function create() {
    			if (fallback_slot) fallback_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (fallback_slot) {
    				fallback_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (fallback_slot && fallback_slot.p && dirty & /*$$scope, $store, store*/ 2051) {
    				fallback_slot.p(get_slot_context(fallback_slot_template, ctx, /*$$scope*/ ctx[11], get_fallback_slot_context), get_slot_changes(fallback_slot_template, /*$$scope*/ ctx[11], dirty, get_fallback_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fallback_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fallback_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (fallback_slot) fallback_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(52:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (50:24) 
    function create_if_block_1(ctx) {
    	let current;
    	const loading_slot_template = /*$$slots*/ ctx[12].loading;
    	const loading_slot = create_slot(loading_slot_template, ctx, /*$$scope*/ ctx[11], get_loading_slot_context);

    	const block = {
    		c: function create() {
    			if (loading_slot) loading_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (loading_slot) {
    				loading_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (loading_slot && loading_slot.p && dirty & /*$$scope, $store, store*/ 2051) {
    				loading_slot.p(get_slot_context(loading_slot_template, ctx, /*$$scope*/ ctx[11], get_loading_slot_context), get_slot_changes(loading_slot_template, /*$$scope*/ ctx[11], dirty, get_loading_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loading_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loading_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (loading_slot) loading_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(50:24) ",
    		ctx
    	});

    	return block;
    }

    // (48:0) {#if $store}
    function create_if_block$2(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope, $store, store*/ 2051) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[11], get_default_slot_context$1), get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, get_default_slot_changes$1));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(48:0) {#if $store}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t0;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let current;
    	const before_slot_template = /*$$slots*/ ctx[12].before;
    	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[11], get_before_slot_context$1);
    	const if_block_creators = [create_if_block$2, create_if_block_1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$store*/ ctx[1]) return 0;
    		if (/*store*/ ctx[0].loading) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	const after_slot_template = /*$$slots*/ ctx[12].after;
    	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[11], get_after_slot_context$1);

    	const block = {
    		c: function create() {
    			if (before_slot) before_slot.c();
    			t0 = space();
    			if_block.c();
    			t1 = space();
    			if (after_slot) after_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (before_slot) {
    				before_slot.m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (after_slot) {
    				after_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (before_slot && before_slot.p && dirty & /*$$scope, $store, store*/ 2051) {
    				before_slot.p(get_slot_context(before_slot_template, ctx, /*$$scope*/ ctx[11], get_before_slot_context$1), get_slot_changes(before_slot_template, /*$$scope*/ ctx[11], dirty, get_before_slot_changes$1));
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(t1.parentNode, t1);
    			}

    			if (after_slot && after_slot.p && dirty & /*$$scope, $store, store*/ 2051) {
    				after_slot.p(get_slot_context(after_slot_template, ctx, /*$$scope*/ ctx[11], get_after_slot_context$1), get_slot_changes(after_slot_template, /*$$scope*/ ctx[11], dirty, get_after_slot_changes$1));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(before_slot, local);
    			transition_in(if_block);
    			transition_in(after_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(before_slot, local);
    			transition_out(if_block);
    			transition_out(after_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (before_slot) before_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t1);
    			if (after_slot) after_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $store,
    		$$unsubscribe_store = noop,
    		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(1, $store = $$value)), store);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
    	let { path } = $$props;
    	let { log = false } = $$props;
    	let { traceId = "" } = $$props;
    	let { startWith = undefined } = $$props;
    	let { maxWait = 10000 } = $$props;
    	let { once = false } = $$props;
    	const opts = { startWith, traceId, log, maxWait, once };
    	let store = docStore(path, opts);
    	validate_store(store, "store");
    	$$subscribe_store();
    	const dispatch = createEventDispatcher();
    	let unsub;
    	onMount(() => dispatch("ref", { ref: store.ref }));
    	onDestroy(() => unsub());
    	const writable_props = ["path", "log", "traceId", "startWith", "maxWait", "once"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Doc> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    		if ("log" in $$props) $$invalidate(3, log = $$props.log);
    		if ("traceId" in $$props) $$invalidate(4, traceId = $$props.traceId);
    		if ("startWith" in $$props) $$invalidate(5, startWith = $$props.startWith);
    		if ("maxWait" in $$props) $$invalidate(6, maxWait = $$props.maxWait);
    		if ("once" in $$props) $$invalidate(7, once = $$props.once);
    		if ("$$scope" in $$props) $$invalidate(11, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {
    			path,
    			log,
    			traceId,
    			startWith,
    			maxWait,
    			once,
    			store,
    			unsub,
    			$store
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    		if ("log" in $$props) $$invalidate(3, log = $$props.log);
    		if ("traceId" in $$props) $$invalidate(4, traceId = $$props.traceId);
    		if ("startWith" in $$props) $$invalidate(5, startWith = $$props.startWith);
    		if ("maxWait" in $$props) $$invalidate(6, maxWait = $$props.maxWait);
    		if ("once" in $$props) $$invalidate(7, once = $$props.once);
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    		if ("unsub" in $$props) $$invalidate(8, unsub = $$props.unsub);
    		if ("$store" in $$props) store.set($store = $$props.$store);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*unsub, path, store*/ 261) {
    			 {
    				if (unsub) {
    					unsub();
    					$$subscribe_store($$invalidate(0, store = docStore(path, opts)));
    					dispatch("ref", { ref: store.ref });
    				}

    				$$invalidate(8, unsub = store.subscribe(data => {
    					dispatch("data", { data });
    				}));
    			}
    		}
    	};

    	return [
    		store,
    		$store,
    		path,
    		log,
    		traceId,
    		startWith,
    		maxWait,
    		once,
    		unsub,
    		opts,
    		dispatch,
    		$$scope,
    		$$slots
    	];
    }

    class Doc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			path: 2,
    			log: 3,
    			traceId: 4,
    			startWith: 5,
    			maxWait: 6,
    			once: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Doc",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*path*/ ctx[2] === undefined && !("path" in props)) {
    			console.warn("<Doc> was created without expected prop 'path'");
    		}
    	}

    	get path() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get log() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set log(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get traceId() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set traceId(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get startWith() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set startWith(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxWait() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxWait(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get once() {
    		throw new Error("<Doc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set once(value) {
    		throw new Error("<Doc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltefire\src\Collection.svelte generated by Svelte v3.16.3 */

    const get_after_slot_changes$2 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1,
    	first: dirty & /*store*/ 1,
    	last: dirty & /*store*/ 1
    });

    const get_after_slot_context$2 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error,
    	first: /*store*/ ctx[0].meta.first,
    	last: /*store*/ ctx[0].meta.last
    });

    const get_fallback_slot_changes$1 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1,
    	first: dirty & /*store*/ 1,
    	last: dirty & /*store*/ 1
    });

    const get_fallback_slot_context$1 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error,
    	first: /*store*/ ctx[0].meta.first,
    	last: /*store*/ ctx[0].meta.last
    });

    const get_loading_slot_changes$1 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1,
    	first: dirty & /*store*/ 1,
    	last: dirty & /*store*/ 1
    });

    const get_loading_slot_context$1 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error,
    	first: /*store*/ ctx[0].meta.first,
    	last: /*store*/ ctx[0].meta.last
    });

    const get_default_slot_changes$2 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1,
    	first: dirty & /*store*/ 1,
    	last: dirty & /*store*/ 1
    });

    const get_default_slot_context$2 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error,
    	first: /*store*/ ctx[0].meta.first,
    	last: /*store*/ ctx[0].meta.last
    });

    const get_before_slot_changes$2 = dirty => ({
    	data: dirty & /*$store*/ 2,
    	ref: dirty & /*store*/ 1,
    	error: dirty & /*store*/ 1,
    	first: dirty & /*store*/ 1,
    	last: dirty & /*store*/ 1
    });

    const get_before_slot_context$2 = ctx => ({
    	data: /*$store*/ ctx[1],
    	ref: /*store*/ ctx[0].ref,
    	error: /*store*/ ctx[0].error,
    	first: /*store*/ ctx[0].meta.first,
    	last: /*store*/ ctx[0].meta.last
    });

    // (52:0) {:else}
    function create_else_block$2(ctx) {
    	let current;
    	const fallback_slot_template = /*$$slots*/ ctx[13].fallback;
    	const fallback_slot = create_slot(fallback_slot_template, ctx, /*$$scope*/ ctx[12], get_fallback_slot_context$1);

    	const block = {
    		c: function create() {
    			if (fallback_slot) fallback_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (fallback_slot) {
    				fallback_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (fallback_slot && fallback_slot.p && dirty & /*$$scope, $store, store*/ 4099) {
    				fallback_slot.p(get_slot_context(fallback_slot_template, ctx, /*$$scope*/ ctx[12], get_fallback_slot_context$1), get_slot_changes(fallback_slot_template, /*$$scope*/ ctx[12], dirty, get_fallback_slot_changes$1));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fallback_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fallback_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (fallback_slot) fallback_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(52:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (50:24) 
    function create_if_block_1$1(ctx) {
    	let current;
    	const loading_slot_template = /*$$slots*/ ctx[13].loading;
    	const loading_slot = create_slot(loading_slot_template, ctx, /*$$scope*/ ctx[12], get_loading_slot_context$1);

    	const block = {
    		c: function create() {
    			if (loading_slot) loading_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (loading_slot) {
    				loading_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (loading_slot && loading_slot.p && dirty & /*$$scope, $store, store*/ 4099) {
    				loading_slot.p(get_slot_context(loading_slot_template, ctx, /*$$scope*/ ctx[12], get_loading_slot_context$1), get_slot_changes(loading_slot_template, /*$$scope*/ ctx[12], dirty, get_loading_slot_changes$1));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loading_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loading_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (loading_slot) loading_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(50:24) ",
    		ctx
    	});

    	return block;
    }

    // (48:0) {#if $store}
    function create_if_block$3(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context$2);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope, $store, store*/ 4099) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context$2), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, get_default_slot_changes$2));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(48:0) {#if $store}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let t0;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let current;
    	const before_slot_template = /*$$slots*/ ctx[13].before;
    	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[12], get_before_slot_context$2);
    	const if_block_creators = [create_if_block$3, create_if_block_1$1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$store*/ ctx[1]) return 0;
    		if (/*store*/ ctx[0].loading) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	const after_slot_template = /*$$slots*/ ctx[13].after;
    	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[12], get_after_slot_context$2);

    	const block = {
    		c: function create() {
    			if (before_slot) before_slot.c();
    			t0 = space();
    			if_block.c();
    			t1 = space();
    			if (after_slot) after_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (before_slot) {
    				before_slot.m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (after_slot) {
    				after_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (before_slot && before_slot.p && dirty & /*$$scope, $store, store*/ 4099) {
    				before_slot.p(get_slot_context(before_slot_template, ctx, /*$$scope*/ ctx[12], get_before_slot_context$2), get_slot_changes(before_slot_template, /*$$scope*/ ctx[12], dirty, get_before_slot_changes$2));
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(t1.parentNode, t1);
    			}

    			if (after_slot && after_slot.p && dirty & /*$$scope, $store, store*/ 4099) {
    				after_slot.p(get_slot_context(after_slot_template, ctx, /*$$scope*/ ctx[12], get_after_slot_context$2), get_slot_changes(after_slot_template, /*$$scope*/ ctx[12], dirty, get_after_slot_changes$2));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(before_slot, local);
    			transition_in(if_block);
    			transition_in(after_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(before_slot, local);
    			transition_out(if_block);
    			transition_out(after_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (before_slot) before_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t1);
    			if (after_slot) after_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $store,
    		$$unsubscribe_store = noop,
    		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(1, $store = $$value)), store);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
    	let { path } = $$props;
    	let { query = null } = $$props;
    	let { traceId = "" } = $$props;
    	let { log = false } = $$props;
    	let { startWith = undefined } = $$props;
    	let { maxWait = 10000 } = $$props;
    	let { once = false } = $$props;
    	const opts = { startWith, traceId, log, maxWait, once };
    	let store = collectionStore(path, query, opts);
    	validate_store(store, "store");
    	$$subscribe_store();
    	const dispatch = createEventDispatcher();
    	let unsub;
    	onMount(() => dispatch("ref", { ref: store.ref }));
    	onDestroy(() => unsub());
    	const writable_props = ["path", "query", "traceId", "log", "startWith", "maxWait", "once"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Collection> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    		if ("query" in $$props) $$invalidate(3, query = $$props.query);
    		if ("traceId" in $$props) $$invalidate(4, traceId = $$props.traceId);
    		if ("log" in $$props) $$invalidate(5, log = $$props.log);
    		if ("startWith" in $$props) $$invalidate(6, startWith = $$props.startWith);
    		if ("maxWait" in $$props) $$invalidate(7, maxWait = $$props.maxWait);
    		if ("once" in $$props) $$invalidate(8, once = $$props.once);
    		if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {
    			path,
    			query,
    			traceId,
    			log,
    			startWith,
    			maxWait,
    			once,
    			store,
    			unsub,
    			$store
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(2, path = $$props.path);
    		if ("query" in $$props) $$invalidate(3, query = $$props.query);
    		if ("traceId" in $$props) $$invalidate(4, traceId = $$props.traceId);
    		if ("log" in $$props) $$invalidate(5, log = $$props.log);
    		if ("startWith" in $$props) $$invalidate(6, startWith = $$props.startWith);
    		if ("maxWait" in $$props) $$invalidate(7, maxWait = $$props.maxWait);
    		if ("once" in $$props) $$invalidate(8, once = $$props.once);
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    		if ("unsub" in $$props) $$invalidate(9, unsub = $$props.unsub);
    		if ("$store" in $$props) store.set($store = $$props.$store);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*unsub, path, query, store*/ 525) {
    			 {
    				if (unsub) {
    					unsub();
    					$$subscribe_store($$invalidate(0, store = collectionStore(path, query, opts)));
    					dispatch("ref", { ref: store.ref });
    				}

    				$$invalidate(9, unsub = store.subscribe(data => {
    					dispatch("data", { data });
    				}));
    			}
    		}
    	};

    	return [
    		store,
    		$store,
    		path,
    		query,
    		traceId,
    		log,
    		startWith,
    		maxWait,
    		once,
    		unsub,
    		opts,
    		dispatch,
    		$$scope,
    		$$slots
    	];
    }

    class Collection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			path: 2,
    			query: 3,
    			traceId: 4,
    			log: 5,
    			startWith: 6,
    			maxWait: 7,
    			once: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Collection",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*path*/ ctx[2] === undefined && !("path" in props)) {
    			console.warn("<Collection> was created without expected prop 'path'");
    		}
    	}

    	get path() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get query() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get traceId() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set traceId(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get log() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set log(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get startWith() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set startWith(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxWait() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxWait(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get once() {
    		throw new Error("<Collection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set once(value) {
    		throw new Error("<Collection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.16.3 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (25:2) {#if !firebaseConfig.projectId}
    function create_if_block_1$2(ctx) {
    	let strong;
    	let t1;
    	let a;
    	let t3;
    	let code;
    	let t5;

    	const block = {
    		c: function create() {
    			strong = element("strong");
    			strong.textContent = "Step 0";
    			t1 = text("\r\n    Create a\r\n    ");
    			a = element("a");
    			a.textContent = "Firebase Project";
    			t3 = text("\r\n    and paste your web config into\r\n    ");
    			code = element("code");
    			code.textContent = "App.svelte";
    			t5 = text("\r\n    .");
    			add_location(strong, file, 25, 4, 730);
    			attr_dev(a, "href", "https://firebase.google.com/");
    			add_location(a, file, 27, 4, 773);
    			add_location(code, file, 29, 4, 874);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, strong, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, a, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, code, anchor);
    			insert_dev(target, t5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(strong);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(a);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(code);
    			if (detaching) detach_dev(t5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(25:2) {#if !firebaseConfig.projectId}",
    		ctx
    	});

    	return block;
    }

    // (52:6) <div slot="signed-out">
    function create_signed_out_slot(ctx) {
    	let div;
    	let button;
    	let dispose;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[2](/*auth*/ ctx[7], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "Sign In Anonymously";
    			add_location(button, file, 53, 8, 1353);
    			attr_dev(div, "slot", "signed-out");
    			add_location(div, file, 51, 6, 1318);
    			dispose = listen_dev(button, "click", click_handler_1, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_signed_out_slot.name,
    		type: "slot",
    		source: "(52:6) <div slot=\\\"signed-out\\\">",
    		ctx
    	});

    	return block;
    }

    // (71:8) <span slot="loading">
    function create_loading_slot_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Loading post...";
    			attr_dev(span, "slot", "loading");
    			add_location(span, file, 70, 8, 1795);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_loading_slot_1.name,
    		type: "slot",
    		source: "(71:8) <span slot=\\\"loading\\\">",
    		ctx
    	});

    	return block;
    }

    // (72:8) <span slot="fallback">
    function create_fallback_slot(ctx) {
    	let span;
    	let button;
    	let dispose;

    	function click_handler_2(...args) {
    		return /*click_handler_2*/ ctx[3](/*postRef*/ ctx[9], ...args);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			button = element("button");
    			button.textContent = "Create Document";
    			add_location(button, file, 72, 10, 1882);
    			attr_dev(span, "slot", "fallback");
    			add_location(span, file, 71, 8, 1848);
    			dispose = listen_dev(button, "click", click_handler_2, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, button);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fallback_slot.name,
    		type: "slot",
    		source: "(72:8) <span slot=\\\"fallback\\\">",
    		ctx
    	});

    	return block;
    }

    // (92:10) {#if !comments.length}
    function create_if_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("No comments yet...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(92:10) {#if !comments.length}",
    		ctx
    	});

    	return block;
    }

    // (96:10) {#each comments as comment}
    function create_each_block(ctx) {
    	let p0;
    	let t0;
    	let p1;
    	let t1_value = /*comment*/ ctx[12].text + "";
    	let t1;
    	let t2;
    	let button;
    	let dispose;

    	function click_handler_3(...args) {
    		return /*click_handler_3*/ ctx[4](/*comment*/ ctx[12], ...args);
    	}

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = space();
    			p1 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			button = element("button");
    			button.textContent = "Delete";
    			add_location(p0, file, 96, 12, 2542);
    			add_location(button, file, 101, 14, 2680);
    			add_location(p1, file, 99, 12, 2631);
    			dispose = listen_dev(button, "click", click_handler_3, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t1);
    			append_dev(p1, t2);
    			append_dev(p1, button);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*comments*/ 1024 && t1_value !== (t1_value = /*comment*/ ctx[12].text + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p1);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(96:10) {#each comments as comment}",
    		ctx
    	});

    	return block;
    }

    // (115:10) <span slot="loading">
    function create_loading_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Loading comments...";
    			attr_dev(span, "slot", "loading");
    			add_location(span, file, 114, 10, 3004);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_loading_slot.name,
    		type: "slot",
    		source: "(115:10) <span slot=\\\"loading\\\">",
    		ctx
    	});

    	return block;
    }

    // (85:8) <Collection            path={postRef.collection('comments')}            query={ref => ref.orderBy('createdAt')}            let:data={comments}            let:ref={commentsRef}            log>
    function create_default_slot_3(ctx) {
    	let t0;
    	let t1;
    	let button;
    	let t3;
    	let dispose;
    	let if_block = !/*comments*/ ctx[10].length && create_if_block$4(ctx);
    	let each_value = /*comments*/ ctx[10];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	function click_handler_4(...args) {
    		return /*click_handler_4*/ ctx[5](/*commentsRef*/ ctx[11], ...args);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			button = element("button");
    			button.textContent = "Add Comment";
    			t3 = space();
    			add_location(button, file, 106, 10, 2794);
    			dispose = listen_dev(button, "click", click_handler_4, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (!/*comments*/ ctx[10].length) {
    				if (!if_block) {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*comments*/ 1024) {
    				each_value = /*comments*/ ctx[10];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t1.parentNode, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t3);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(85:8) <Collection            path={postRef.collection('comments')}            query={ref => ref.orderBy('createdAt')}            let:data={comments}            let:ref={commentsRef}            log>",
    		ctx
    	});

    	return block;
    }

    // (62:6) <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
    function create_default_slot_2(ctx) {
    	let h2;
    	let t0_value = /*post*/ ctx[8].title + "";
    	let t0;
    	let t1;
    	let p;
    	let t2;
    	let em;
    	let t3_value = new Date(/*post*/ ctx[8].createdAt).toLocaleString() + "";
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let h3;
    	let t8;
    	let current;

    	const collection = new Collection({
    			props: {
    				path: /*postRef*/ ctx[9].collection("comments"),
    				query: func,
    				log: true,
    				$$slots: {
    					default: [
    						create_default_slot_3,
    						({ data: comments, ref: commentsRef }) => ({ 10: comments, 11: commentsRef }),
    						({ data: comments, ref: commentsRef }) => (comments ? 1024 : 0) | (commentsRef ? 2048 : 0)
    					],
    					loading: [
    						create_loading_slot,
    						({ data: comments, ref: commentsRef }) => ({ 10: comments, 11: commentsRef }),
    						({ data: comments, ref: commentsRef }) => (comments ? 1024 : 0) | (commentsRef ? 2048 : 0)
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text("Document\r\n          created at ");
    			em = element("em");
    			t3 = text(t3_value);
    			t4 = space();
    			t5 = space();
    			t6 = space();
    			h3 = element("h3");
    			h3.textContent = "Comments";
    			t8 = space();
    			create_component(collection.$$.fragment);
    			add_location(h2, file, 63, 8, 1638);
    			attr_dev(em, "class", "svelte-18m3qkn");
    			add_location(em, file, 67, 21, 1717);
    			add_location(p, file, 65, 8, 1671);
    			add_location(h3, file, 83, 8, 2182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t2);
    			append_dev(p, em);
    			append_dev(em, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(collection, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*post*/ 256) && t0_value !== (t0_value = /*post*/ ctx[8].title + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*post*/ 256) && t3_value !== (t3_value = new Date(/*post*/ ctx[8].createdAt).toLocaleString() + "")) set_data_dev(t3, t3_value);
    			const collection_changes = {};
    			if (dirty & /*postRef*/ 512) collection_changes.path = /*postRef*/ ctx[9].collection("comments");

    			if (dirty & /*$$scope*/ 32768) {
    				collection_changes.$$scope = { dirty, ctx };
    			}

    			collection.$set(collection_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(collection.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(collection.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t8);
    			destroy_component(collection, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(62:6) <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>",
    		ctx
    	});

    	return block;
    }

    // (46:4) <User let:user let:auth>
    function create_default_slot_1(ctx) {
    	let t0;
    	let em;
    	let t1_value = /*user*/ ctx[6].uid + "";
    	let t1;
    	let t2;
    	let button;
    	let t4;
    	let t5;
    	let hr;
    	let t6;
    	let current;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[1](/*auth*/ ctx[7], ...args);
    	}

    	const doc = new Doc({
    			props: {
    				path: `posts/${/*user*/ ctx[6].uid}`,
    				log: true,
    				$$slots: {
    					default: [
    						create_default_slot_2,
    						({ data: post, ref: postRef }) => ({ 8: post, 9: postRef }),
    						({ data: post, ref: postRef }) => (post ? 256 : 0) | (postRef ? 512 : 0)
    					],
    					fallback: [
    						create_fallback_slot,
    						({ data: post, ref: postRef }) => ({ 8: post, 9: postRef }),
    						({ data: post, ref: postRef }) => (post ? 256 : 0) | (postRef ? 512 : 0)
    					],
    					loading: [
    						create_loading_slot_1,
    						({ data: post, ref: postRef }) => ({ 8: post, 9: postRef }),
    						({ data: post, ref: postRef }) => (post ? 256 : 0) | (postRef ? 512 : 0)
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = text("Howdy 😀! User\r\n      ");
    			em = element("em");
    			t1 = text(t1_value);
    			t2 = space();
    			button = element("button");
    			button.textContent = "Sign Out";
    			t4 = space();
    			t5 = space();
    			hr = element("hr");
    			t6 = space();
    			create_component(doc.$$.fragment);
    			attr_dev(em, "class", "svelte-18m3qkn");
    			add_location(em, file, 47, 6, 1222);
    			add_location(button, file, 49, 6, 1251);
    			attr_dev(hr, "class", "svelte-18m3qkn");
    			add_location(hr, file, 58, 6, 1477);
    			dispose = listen_dev(button, "click", click_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, em, anchor);
    			append_dev(em, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(doc, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*user*/ 64) && t1_value !== (t1_value = /*user*/ ctx[6].uid + "")) set_data_dev(t1, t1_value);
    			const doc_changes = {};
    			if (dirty & /*user*/ 64) doc_changes.path = `posts/${/*user*/ ctx[6].uid}`;

    			if (dirty & /*$$scope*/ 32768) {
    				doc_changes.$$scope = { dirty, ctx };
    			}

    			doc.$set(doc_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(doc.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(doc.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(em);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t6);
    			destroy_component(doc, detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(46:4) <User let:user let:auth>",
    		ctx
    	});

    	return block;
    }

    // (35:2) <FirebaseApp {firebase}>
    function create_default_slot(ctx) {
    	let h1;
    	let t1;
    	let p;
    	let strong;
    	let t3;
    	let t4;
    	let current;

    	const user = new User({
    			props: {
    				$$slots: {
    					default: [
    						create_default_slot_1,
    						({ user, auth }) => ({ 6: user, 7: auth }),
    						({ user, auth }) => (user ? 64 : 0) | (auth ? 128 : 0)
    					],
    					"signed-out": [
    						create_signed_out_slot,
    						({ user, auth }) => ({ 6: user, 7: auth }),
    						({ user, auth }) => (user ? 64 : 0) | (auth ? 128 : 0)
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "💪🔥 Mode Activated";
    			t1 = space();
    			p = element("p");
    			strong = element("strong");
    			strong.textContent = "Tip:";
    			t3 = text("\r\n      Open the browser console for development logging.");
    			t4 = space();
    			create_component(user.$$.fragment);
    			attr_dev(h1, "class", "svelte-18m3qkn");
    			add_location(h1, file, 36, 4, 982);
    			add_location(strong, file, 39, 6, 1029);
    			add_location(p, file, 38, 4, 1018);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, strong);
    			append_dev(p, t3);
    			insert_dev(target, t4, anchor);
    			mount_component(user, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const user_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				user_changes.$$scope = { dirty, ctx };
    			}

    			user.$set(user_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(user.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(user.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t4);
    			destroy_component(user, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(35:2) <FirebaseApp {firebase}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let main;
    	let t;
    	let current;
    	let if_block = !/*firebaseConfig*/ ctx[0].projectId && create_if_block_1$2(ctx);

    	const firebaseapp = new FirebaseApp({
    			props: {
    				firebase,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			if (if_block) if_block.c();
    			t = space();
    			create_component(firebaseapp.$$.fragment);
    			attr_dev(main, "class", "svelte-18m3qkn");
    			add_location(main, file, 22, 0, 681);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t);
    			mount_component(firebaseapp, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const firebaseapp_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				firebaseapp_changes.$$scope = { dirty, ctx };
    			}

    			firebaseapp.$set(firebaseapp_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(firebaseapp.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(firebaseapp.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			destroy_component(firebaseapp);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = ref => ref.orderBy("createdAt");

    function instance$4($$self) {
    	let firebaseConfig = {
    		apiKey: "AIzaSyDDxZA7Sf8k2XrmgYHcTKRcBktSHus8jBc",
    		authDomain: "svelte-playground-app.firebaseapp.com",
    		projectId: "svelte-playground-app",
    		storageBucket: "svelte-playground-app.appspot.com",
    		messagingSenderId: "182565394583",
    		appId: "1:182565394583:web:38a12de2e3d2cfafd2b1d2",
    		measurementId: "G-D8CQV2LNMF"
    	};

    	firebase.initializeApp(firebaseConfig);
    	const click_handler = auth => auth.signOut();
    	const click_handler_1 = auth => auth.signInAnonymously();

    	const click_handler_2 = postRef => postRef.set({
    		title: "📜 I like Svelte",
    		createdAt: Date.now()
    	});

    	const click_handler_3 = comment => comment.ref.delete();

    	const click_handler_4 = commentsRef => commentsRef.add({
    		text: "💬 Me too!",
    		createdAt: Date.now()
    	});

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("firebaseConfig" in $$props) $$invalidate(0, firebaseConfig = $$props.firebaseConfig);
    	};

    	return [
    		firebaseConfig,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}(firebase));
//# sourceMappingURL=bundle.js.map
