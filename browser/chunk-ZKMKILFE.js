import{a as Me,b as re,o as Ee}from"./chunk-BH7X5VPK.js";import{B as _,Ca as s,Fa as ne,Fb as D,Gb as c,Ka as j,L as k,La as d,N as Q,Na as h,O as R,Q as F,R as G,S as T,U as v,Va as Ae,W as De,a as l,b as u,ca as ee,cb as ie,fa as be,j as ve,k as J,ka as C,mb as U,n as ye,o as Ce,oa as te,p as m,qa as V,s as y,vb as w,z as Ve}from"./chunk-KI75AEYF.js";var ke=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(i){return new(i||n)(s(ne),s(te))};static \u0275dir=d({type:n})}return n})(),it=(()=>{class n extends ke{static \u0275fac=(()=>{let t;return function(r){return(t||(t=be(n)))(r||n)}})();static \u0275dir=d({type:n,features:[h]})}return n})(),Re=new v("");var rt={provide:Re,useExisting:F(()=>Ge),multi:!0};function ot(){let n=re()?re().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var st=new v(""),Ge=(()=>{class n extends ke{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!ot())}writeValue(t){let i=t??"";this.setProperty("value",i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(i){return new(i||n)(s(ne),s(te),s(st,8))};static \u0275dir=d({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&U("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[w([rt]),h]})}return n})();function f(n){return n==null||(typeof n=="string"||Array.isArray(n))&&n.length===0}function Te(n){return n!=null&&typeof n.length=="number"}var ce=new v(""),he=new v(""),at=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Fe=class{static min(e){return lt(e)}static max(e){return ut(e)}static required(e){return dt(e)}static requiredTrue(e){return ct(e)}static email(e){return ht(e)}static minLength(e){return ft(e)}static maxLength(e){return pt(e)}static pattern(e){return gt(e)}static nullValidator(e){return je(e)}static compose(e){return We(e)}static composeAsync(e){return qe(e)}};function lt(n){return e=>{if(f(e.value)||f(n))return null;let t=parseFloat(e.value);return!isNaN(t)&&t<n?{min:{min:n,actual:e.value}}:null}}function ut(n){return e=>{if(f(e.value)||f(n))return null;let t=parseFloat(e.value);return!isNaN(t)&&t>n?{max:{max:n,actual:e.value}}:null}}function dt(n){return f(n.value)?{required:!0}:null}function ct(n){return n.value===!0?null:{required:!0}}function ht(n){return f(n.value)||at.test(n.value)?null:{email:!0}}function ft(n){return e=>f(e.value)||!Te(e.value)?null:e.value.length<n?{minlength:{requiredLength:n,actualLength:e.value.length}}:null}function pt(n){return e=>Te(e.value)&&e.value.length>n?{maxlength:{requiredLength:n,actualLength:e.value.length}}:null}function gt(n){if(!n)return je;let e,t;return typeof n=="string"?(t="",n.charAt(0)!=="^"&&(t+="^"),t+=n,n.charAt(n.length-1)!=="$"&&(t+="$"),e=new RegExp(t)):(t=n.toString(),e=n),i=>{if(f(i.value))return null;let r=i.value;return e.test(r)?null:{pattern:{requiredPattern:t,actualValue:r}}}}function je(n){return null}function Ue(n){return n!=null}function Be(n){return Ae(n)?ye(n):n}function He(n){let e={};return n.forEach(t=>{e=t!=null?l(l({},e),t):e}),Object.keys(e).length===0?null:e}function Le(n,e){return e.map(t=>t(n))}function mt(n){return!n.validate}function $e(n){return n.map(e=>mt(e)?e:t=>e.validate(t))}function We(n){if(!n)return null;let e=n.filter(Ue);return e.length==0?null:function(t){return He(Le(t,e))}}function fe(n){return n!=null?We($e(n)):null}function qe(n){if(!n)return null;let e=n.filter(Ue);return e.length==0?null:function(t){let i=Le(t,e).map(Be);return Ve(i).pipe(y(He))}}function pe(n){return n!=null?qe($e(n)):null}function we(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function ze(n){return n._rawValidators}function Ze(n){return n._rawAsyncValidators}function oe(n){return n?Array.isArray(n)?n:[n]:[]}function L(n,e){return Array.isArray(n)?n.includes(e):n===e}function Ie(n,e){let t=oe(e);return oe(n).forEach(r=>{L(t,r)||t.push(r)}),t}function Se(n,e){return oe(e).filter(t=>!L(n,t))}var $=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=fe(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=pe(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}},p=class extends ${name;get formDirective(){return null}get path(){return null}},P=class extends ${_parent=null;name=null;valueAccessor=null},W=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},_t={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},on=u(l({},_t),{"[class.ng-submitted]":"isSubmitted"}),sn=(()=>{class n extends W{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(s(P,2))};static \u0275dir=d({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&ie("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[h]})}return n})(),an=(()=>{class n extends W{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(s(p,10))};static \u0275dir=d({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&ie("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[h]})}return n})();var I="VALID",B="INVALID",b="PENDING",S="DISABLED",g=class{},q=class extends g{value;source;constructor(e,t){super(),this.value=e,this.source=t}},O=class extends g{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},x=class extends g{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},A=class extends g{status;source;constructor(e,t){super(),this.status=e,this.source=t}},se=class extends g{source;constructor(e){super(),this.source=e}},ae=class extends g{source;constructor(e){super(),this.source=e}};function ge(n){return(X(n)?n.validators:n)||null}function vt(n){return Array.isArray(n)?fe(n):n||null}function me(n,e){return(X(e)?e.asyncValidators:n)||null}function yt(n){return Array.isArray(n)?pe(n):n||null}function X(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function Xe(n,e,t){let i=n.controls;if(!(e?Object.keys(i):i).length)throw new R(1e3,"");if(!i[t])throw new R(1001,"")}function Ye(n,e,t){n._forEachChild((i,r)=>{if(t[r]===void 0)throw new R(1002,"")})}var M=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return c(this.statusReactive)}set status(e){c(()=>this.statusReactive.set(e))}_status=D(()=>this.statusReactive());statusReactive=V(void 0);get valid(){return this.status===I}get invalid(){return this.status===B}get pending(){return this.status==b}get disabled(){return this.status===S}get enabled(){return this.status!==S}errors;get pristine(){return c(this.pristineReactive)}set pristine(e){c(()=>this.pristineReactive.set(e))}_pristine=D(()=>this.pristineReactive());pristineReactive=V(!0);get dirty(){return!this.pristine}get touched(){return c(this.touchedReactive)}set touched(e){c(()=>this.touchedReactive.set(e))}_touched=D(()=>this.touchedReactive());touchedReactive=V(!1);get untouched(){return!this.touched}_events=new ve;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(Ie(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(Ie(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(Se(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(Se(e,this._rawAsyncValidators))}hasValidator(e){return L(this._rawValidators,e)}hasAsyncValidator(e){return L(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsTouched(u(l({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new x(!0,i))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new x(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsDirty(u(l({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new O(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new O(!0,i))}markAsPending(e={}){this.status=b;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new A(this.status,t)),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.markAsPending(u(l({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=S,this.errors=null,this._forEachChild(r=>{r.disable(u(l({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new q(this.value,i)),this._events.next(new A(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(u(l({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=I,this._forEachChild(i=>{i.enable(u(l({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(u(l({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine({},t),this._parent._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===I||this.status===b)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new q(this.value,t)),this._events.next(new A(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(u(l({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?S:I}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=b,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1};let i=Be(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=this._hasOwnPendingAsyncValidator?.emitEvent??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i&&i.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new A(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new C,this.statusChanges=new C}_calculateStatus(){return this._allControlsDisabled()?S:this.errors?B:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(b)?b:this._anyControlsHaveStatus(B)?B:I}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,this._parent&&!e.onlySelf&&this._parent._updatePristine(e,t),r&&this._events.next(new O(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new x(this.touched,t)),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){X(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let t=this._parent&&this._parent.dirty;return!e&&!!t&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=vt(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=yt(this._rawAsyncValidators)}},E=class extends M{constructor(e,t,i){super(ge(t),me(i,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this.controls[e]?this.controls[e]:(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,i={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,i={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(e){return this.controls.hasOwnProperty(e)&&this.controls[e].enabled}setValue(e,t={}){Ye(this,!0,e),Object.keys(e).forEach(i=>{Xe(this,!0,i),this.controls[i].setValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(i=>{let r=this.controls[i];r&&r.patchValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((i,r)=>{i.reset(e?e[r]:null,{onlySelf:!0,emitEvent:t.emitEvent})}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t)}getRawValue(){return this._reduceChildren({},(e,t,i)=>(e[i]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(t,i)=>i._syncPendingControls()?!0:t);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let i=this.controls[t];i&&e(i,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,i]of Object.entries(this.controls))if(this.contains(t)&&e(i))return!0;return!1}_reduceValue(){let e={};return this._reduceChildren(e,(t,i,r)=>((i.enabled||this.disabled)&&(t[r]=i.value),t))}_reduceChildren(e,t){let i=e;return this._forEachChild((r,o)=>{i=t(i,r,o)}),i}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return this.controls.hasOwnProperty(e)?this.controls[e]:null}};var le=class extends E{};var Y=new v("",{providedIn:"root",factory:()=>K}),K="always";function Ct(n,e){return[...e.path,n]}function ue(n,e,t=K){_e(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),Dt(n,e),At(n,e),bt(n,e),Vt(n,e)}function Ne(n,e,t=!0){let i=()=>{};e.valueAccessor&&(e.valueAccessor.registerOnChange(i),e.valueAccessor.registerOnTouched(i)),Z(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function z(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function Vt(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function _e(n,e){let t=ze(n);e.validator!==null?n.setValidators(we(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let i=Ze(n);e.asyncValidator!==null?n.setAsyncValidators(we(i,e.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();z(e._rawValidators,r),z(e._rawAsyncValidators,r)}function Z(n,e){let t=!1;if(n!==null){if(e.validator!==null){let r=ze(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==e.validator);o.length!==r.length&&(t=!0,n.setValidators(o))}}if(e.asyncValidator!==null){let r=Ze(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==e.asyncValidator);o.length!==r.length&&(t=!0,n.setAsyncValidators(o))}}}let i=()=>{};return z(e._rawValidators,i),z(e._rawAsyncValidators,i),t}function Dt(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&Ke(n,e)})}function bt(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&Ke(n,e),n.updateOn!=="submit"&&n.markAsTouched()})}function Ke(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function At(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function Je(n,e){n==null,_e(n,e)}function Mt(n,e){return Z(n,e)}function Et(n,e){if(!n.hasOwnProperty("model"))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function Ft(n){return Object.getPrototypeOf(n.constructor)===it}function Qe(n,e){n._syncPendingControls(),e.forEach(t=>{let i=t.control;i.updateOn==="submit"&&i._pendingChange&&(t.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function wt(n,e){if(!e)return null;Array.isArray(e);let t,i,r;return e.forEach(o=>{o.constructor===Ge?t=o:Ft(o)?i=o:r=o}),r||i||t||null}function It(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}var St={provide:p,useExisting:F(()=>Nt)},N=Promise.resolve(),Nt=(()=>{class n extends p{callSetDisabledState;get submitted(){return c(this.submittedReactive)}_submitted=D(()=>this.submittedReactive());submittedReactive=V(!1);_directives=new Set;form;ngSubmit=new C;options;constructor(t,i,r){super(),this.callSetDisabledState=r,this.form=new E({},fe(t),pe(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){N.then(()=>{let i=this._findContainer(t.path);t.control=i.registerControl(t.name,t.control),ue(t.control,t,this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){N.then(()=>{let i=this._findContainer(t.path);i&&i.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){N.then(()=>{let i=this._findContainer(t.path),r=new E({});Je(r,t),i.registerControl(t.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){N.then(()=>{let i=this._findContainer(t.path);i&&i.removeControl(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,i){N.then(()=>{this.form.get(t.path).setValue(i)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Qe(this.form,this._directives),this.ngSubmit.emit(t),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(i){return new(i||n)(s(ce,10),s(he,10),s(Y,8))};static \u0275dir=d({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&U("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[w([St]),h]})}return n})();function Oe(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function xe(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var H=class extends M{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(ge(t),me(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),X(t)&&(t.nonNullable||t.initialValueIsDefault)&&(xe(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Oe(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Oe(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){xe(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var Ot=n=>n instanceof H;var un=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=d({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return n})();var et=new v("");var xt={provide:p,useExisting:F(()=>Pt)},Pt=(()=>{class n extends p{callSetDisabledState;get submitted(){return c(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=D(()=>this._submittedReactive());_submittedReactive=V(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];form=null;ngSubmit=new C;constructor(t,i,r){super(),this.callSetDisabledState=r,this._setValidators(t),this._setAsyncValidators(i)}ngOnChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}ngOnDestroy(){this.form&&(Z(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get control(){return this.form}get path(){return[]}addControl(t){let i=this.form.get(t.path);return ue(i,t,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),i}getControl(t){return this.form.get(t.path)}removeControl(t){Ne(t.control||null,t,!1),It(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}getFormArray(t){return this.form.get(t.path)}updateModel(t,i){this.form.get(t.path).setValue(i)}onSubmit(t){return this._submittedReactive.set(!0),Qe(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new se(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this._submittedReactive.set(!1),this.form._events.next(new ae(this.form))}_updateDomValue(){this.directives.forEach(t=>{let i=t.control,r=this.form.get(t.path);i!==r&&(Ne(i||null,t),Ot(r)&&(ue(r,t,this.callSetDisabledState),t.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let i=this.form.get(t.path);Je(i,t),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){if(this.form){let i=this.form.get(t.path);i&&Mt(i,t)&&i.updateValueAndValidity({emitEvent:!1})}}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm&&this._oldForm._registerOnCollectionChange(()=>{})}_updateValidators(){_e(this.form,this),this._oldForm&&Z(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||n)(s(ce,10),s(he,10),s(Y,8))};static \u0275dir=d({type:n,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&U("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[w([xt]),h,ee]})}return n})();var kt={provide:P,useExisting:F(()=>Rt)},Rt=(()=>{class n extends P{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(t){}model;update=new C;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,i,r,o,a){super(),this._ngModelWarningConfig=a,this._parent=t,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=wt(this,o)}ngOnChanges(t){this._added||this._setUpControl(),Et(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return Ct(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||n)(s(p,13),s(ce,10),s(he,10),s(Re,10),s(et,8))};static \u0275dir=d({type:n,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[w([kt]),h,ee]})}return n})();var tt=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=j({type:n});static \u0275inj=T({})}return n})(),de=class extends M{constructor(e,t,i){super(ge(t),me(i,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(e){return this.controls[this._adjustIndex(e)]}push(e,t={}){this.controls.push(e),this._registerControl(e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}insert(e,t,i={}){this.controls.splice(e,0,t),this._registerControl(t),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(e,t={}){let i=this._adjustIndex(e);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:t.emitEvent})}setControl(e,t,i={}){let r=this._adjustIndex(e);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),t&&(this.controls.splice(r,0,t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(e,t={}){Ye(this,!1,e),e.forEach((i,r)=>{Xe(this,!1,r),this.at(r).setValue(i,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(e,t={}){e!=null&&(e.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e=[],t={}){this._forEachChild((i,r)=>{i.reset(e[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t)}getRawValue(){return this.controls.map(e=>e.getRawValue())}clear(e={}){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:e.emitEvent}))}_adjustIndex(e){return e<0?e+this.length:e}_syncPendingControls(){let e=this.controls.reduce((t,i)=>i._syncPendingControls()?!0:t,!1);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){this.controls.forEach((t,i)=>{e(t,i)})}_updateValue(){this.value=this.controls.filter(e=>e.enabled||this.disabled).map(e=>e.value)}_anyControls(e){return this.controls.some(t=>t.enabled&&e(t))}_setUpControls(){this._forEachChild(e=>this._registerControl(e))}_allControlsDisabled(){for(let e of this.controls)if(e.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(e){e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)}_find(e){return this.at(e)??null}};function Pe(n){return!!n&&(n.asyncValidators!==void 0||n.validators!==void 0||n.updateOn!==void 0)}var dn=(()=>{class n{useNonNullable=!1;get nonNullable(){let t=new n;return t.useNonNullable=!0,t}group(t,i=null){let r=this._reduceControls(t),o={};return Pe(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new E(r,o)}record(t,i=null){let r=this._reduceControls(t);return new le(r,i)}control(t,i,r){let o={};return this.useNonNullable?(Pe(i)?o=i:(o.validators=i,o.asyncValidators=r),new H(t,u(l({},o),{nonNullable:!0}))):new H(t,i,r)}array(t,i,r){let o=t.map(a=>this._createControl(a));return new de(o,i,r)}_reduceControls(t){let i={};return Object.keys(t).forEach(r=>{i[r]=this._createControl(t[r])}),i}_createControl(t){if(t instanceof H)return t;if(t instanceof M)return t;if(Array.isArray(t)){let i=t[0],r=t.length>1?t[1]:null,o=t.length>2?t[2]:null;return this.control(i,r,o)}else return this.control(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=G({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var cn=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:Y,useValue:t.callSetDisabledState??K}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=j({type:n});static \u0275inj=T({imports:[tt]})}return n})(),hn=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:et,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:Y,useValue:t.callSetDisabledState??K}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=j({type:n});static \u0275inj=T({imports:[tt]})}return n})();var yn=(()=>{class n{constructor(t){this.http=t,this.baseUrl=Me.movieApi.baseUrl,this.user=new J(null),this.initialized$=new J(!1);let i=localStorage.getItem("session_id");i?this.getAccount(i).subscribe(r=>{this.user.next(r),this.initialized$.next(!0)}):this.logout().subscribe(()=>{this.initialized$.next(!0)})}createRequestToken(){return this.http.get(`${this.baseUrl}/authentication/token/new`).pipe(y(({request_token:t})=>t||""),_(t=>m(()=>(console.error(t),new Error("Token request failed.")))))}validateWithLogin(t,i,r){return this.http.post(`${this.baseUrl}/authentication/token/validate_with_login`,{username:t,password:i,request_token:r}).pipe(y(({request_token:o})=>o||""),_(o=>m(()=>(console.error(o),new Error("Login validation failed.")))))}createSession(t){return this.http.post(`${this.baseUrl}/authentication/session/new`,{request_token:t}).pipe(_(i=>m(()=>(console.error(i),new Error("Session creation failed.")))))}getAccount(t){return this.http.get(`${this.baseUrl}/account`,{params:{session_id:t}}).pipe(_(i=>m(()=>(console.error(i),new Error("Invalid session ID.")))))}deleteSession(t){return this.http.delete(`${this.baseUrl}/authentication/session`,{body:{session_id:t}}).pipe(_(i=>m(()=>(console.error(i),new Error("Session deletion failed.")))))}login(t,i){return this.createRequestToken().pipe(k(r=>this.validateWithLogin(t,i,r)),k(r=>this.createSession(r)),y(r=>(localStorage.setItem("session_id",r.session_id),r.session_id)),k(r=>this.getAccount(r)),Q(r=>{this.user.next(r)}),_(r=>m(()=>r)))}logout(){let t=localStorage.getItem("session_id");return(t?this.deleteSession(t):Ce(null)).pipe(Q(()=>{localStorage.removeItem("session_id"),this.user.next(null)}))}static{this.\u0275fac=function(i){return new(i||n)(De(Ee))}}static{this.\u0275prov=G({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();export{Ge as a,Fe as b,sn as c,an as d,Nt as e,un as f,Pt as g,Rt as h,dn as i,cn as j,hn as k,yn as l};
