import {Injectable, Optional} from '@angular/core';

export interface ParentRouter{
  path: string;
  icon: string;
  text: string;
}

export interface Router extends  ParentRouter{

  subRouter?: { path: string; icon: string; text: string }[];
}

export class RouterConfig {
  public routerDataConfig  = [<Router>{
    path: "",
    icon: "",
    text: "",
    subRouter: [{
      path: "",
      icon: "",
      text: ""
    }]
  }]
  public iconApp: string = ''
}
@Injectable({
  providedIn: 'root'
})
export class FrameService {
  private readonly _routerDataConfig: RouterConfig | undefined;
  constructor(@Optional() config?: RouterConfig) {
    if (config) {
      this._routerDataConfig = config
    }
  }

  get routerDataConfig(){
    return this._routerDataConfig;
  }
}
