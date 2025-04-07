import {
  CommonModule
} from "./chunk-APQJ6POP.js";
import {
  Directive,
  ElementRef,
  HostBinding,
  Injectable,
  Input,
  NgModule
} from "./chunk-IGJZNA3K.js";
import "./chunk-V4GYEGQC.js";
import "./chunk-CONQKHOI.js";
import "./chunk-GC5FLHL6.js";

// node_modules/ng-scrollreveal/services/ngs-reveal-config.js
var NgsRevealConfig = function() {
  function NgsRevealConfig2() {
    this.origin = "bottom";
    this.distance = "20px";
    this.duration = 500;
    this.delay = 0;
    this.rotate = { x: 0, y: 0, z: 0 };
    this.opacity = 0;
    this.scale = 0.9;
    this.easing = "cubic-bezier(0.6, 0.2, 0.1, 1)";
    this.mobile = true;
    this.reset = false;
    this.useDelay = "always";
    this.viewFactor = 0.2;
    this.viewOffset = { top: 0, right: 0, bottom: 0, left: 0 };
  }
  NgsRevealConfig2.decorators = [
    { type: Injectable }
  ];
  NgsRevealConfig2.ctorParameters = [];
  return NgsRevealConfig2;
}();

// node_modules/ng-scrollreveal/services/window.service.js
var WindowService = function() {
  function WindowService2() {
  }
  Object.defineProperty(WindowService2.prototype, "nativeWindow", {
    get: function() {
      return _window();
    },
    enumerable: true,
    configurable: true
  });
  WindowService2.decorators = [
    { type: Injectable }
  ];
  WindowService2.ctorParameters = [];
  return WindowService2;
}();
function _window() {
  return typeof window !== "undefined" ? window : void 0;
}

// node_modules/ng-scrollreveal/services/ngs-reveal.service.js
var NgsRevealService = function() {
  function NgsRevealService2(config, windowService) {
    this.config = config;
    this.windowService = windowService;
    this.window = windowService.nativeWindow;
    if (this.window) {
      var srConfig = Object.assign({}, config || {});
      this.sr = ScrollReveal(srConfig);
    }
  }
  NgsRevealService2.prototype.reveal = function(elementRef, config) {
    if (!this.window) {
      return null;
    }
    return elementRef.nativeElement ? this.sr.reveal(elementRef.nativeElement, config) : this.sr;
  };
  NgsRevealService2.prototype.revealSet = function(parentElementRef, selector, interval, config) {
    if (!this.window) {
      return null;
    }
    return parentElementRef.nativeElement ? this.sr.reveal(selector, config, interval) : this.sr;
  };
  NgsRevealService2.prototype.sync = function() {
    if (this.window) {
      this.sr.sync();
    }
  };
  NgsRevealService2.decorators = [
    { type: Injectable }
  ];
  NgsRevealService2.ctorParameters = [
    { type: NgsRevealConfig },
    { type: WindowService }
  ];
  return NgsRevealService2;
}();

// node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js
var AbstractNgsRevealDirective = function() {
  function AbstractNgsRevealDirective2(ngsRevealService) {
    this.ngsRevealService = ngsRevealService;
  }
  AbstractNgsRevealDirective2.prototype._initConfig = function(value) {
    if (value && typeof value === "string") {
      this.config = JSON.parse(value);
    } else if (value && typeof value === "object") {
      this.config = value;
    }
  };
  return AbstractNgsRevealDirective2;
}();

// node_modules/ng-scrollreveal/directives/ngs-reveal.directive.js
var __extends = function(d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgsRevealDirective = function(_super) {
  __extends(NgsRevealDirective2, _super);
  function NgsRevealDirective2(elementRef, ngsRevealService) {
    _super.call(this, ngsRevealService);
    this.elementRef = elementRef;
    this.visibility = "hidden";
  }
  Object.defineProperty(NgsRevealDirective2.prototype, "_config", {
    /**
     * Custom configuration to use when revealing this element
     */
    set: function(value) {
      this._initConfig(value);
    },
    enumerable: true,
    configurable: true
  });
  NgsRevealDirective2.prototype.ngOnInit = function() {
    this.ngsRevealService.reveal(this.elementRef, this.config);
  };
  NgsRevealDirective2.decorators = [
    { type: Directive, args: [{
      selector: "[ngsReveal]"
    }] }
  ];
  NgsRevealDirective2.ctorParameters = [
    { type: ElementRef },
    { type: NgsRevealService }
  ];
  NgsRevealDirective2.propDecorators = {
    "visibility": [{ type: HostBinding, args: ["style.visibility"] }],
    "_config": [{ type: Input, args: ["ngsReveal"] }]
  };
  return NgsRevealDirective2;
}(AbstractNgsRevealDirective);

// node_modules/ng-scrollreveal/directives/ngs-reveal-set.directive.js
var __extends2 = function(d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgsRevealSetDirective = function(_super) {
  __extends2(NgsRevealSetDirective2, _super);
  function NgsRevealSetDirective2(elementRef, ngsRevealService) {
    _super.call(this, ngsRevealService);
    this.elementRef = elementRef;
  }
  Object.defineProperty(NgsRevealSetDirective2.prototype, "_config", {
    /**
     * Custom configuration to use when revealing this set of elements
     */
    set: function(value) {
      this._initConfig(value);
    },
    enumerable: true,
    configurable: true
  });
  NgsRevealSetDirective2.prototype.ngOnInit = function() {
    if (!this.ngsSelector && console) {
      var item = this.elementRef.nativeElement ? this.elementRef.nativeElement.className : "";
      console.error(`[ng-scrollreveal] You must set "[ngsSelector]" attribute on item '` + item + `' when using "ngsRevealSet"`);
      return;
    }
    this.ngsRevealService.revealSet(this.elementRef, this.ngsSelector, this.ngsInterval, this.config);
  };
  NgsRevealSetDirective2.prototype.ngOnChanges = function(changes) {
    var ngsSyncProp = "ngsSync";
    if (ngsSyncProp in changes && !changes[ngsSyncProp].isFirstChange() && !changes[ngsSyncProp].currentValue()) {
      this.ngsRevealService.sync();
    }
  };
  NgsRevealSetDirective2.decorators = [
    { type: Directive, args: [{
      selector: "[ngsRevealSet]"
    }] }
  ];
  NgsRevealSetDirective2.ctorParameters = [
    { type: ElementRef },
    { type: NgsRevealService }
  ];
  NgsRevealSetDirective2.propDecorators = {
    "_config": [{ type: Input, args: ["ngsRevealSet"] }],
    "ngsSelector": [{ type: Input }],
    "ngsInterval": [{ type: Input }],
    "ngsSync": [{ type: Input }]
  };
  return NgsRevealSetDirective2;
}(AbstractNgsRevealDirective);

// node_modules/ng-scrollreveal/ngs-reveal.module.js
var NgsRevealModule = function() {
  function NgsRevealModule2() {
  }
  NgsRevealModule2.forRoot = function() {
    return {
      ngModule: NgsRevealModule2,
      providers: [WindowService, NgsRevealService, NgsRevealConfig]
    };
  };
  NgsRevealModule2.decorators = [
    { type: NgModule, args: [{
      imports: [
        CommonModule
      ],
      exports: [NgsRevealDirective, NgsRevealSetDirective],
      declarations: [NgsRevealDirective, NgsRevealSetDirective]
    }] }
  ];
  NgsRevealModule2.ctorParameters = [];
  return NgsRevealModule2;
}();
export {
  NgsRevealConfig,
  NgsRevealDirective,
  NgsRevealModule,
  NgsRevealService,
  NgsRevealSetDirective,
  WindowService
};
//# sourceMappingURL=ng-scrollreveal.js.map
