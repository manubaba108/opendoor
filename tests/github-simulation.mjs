/* Contract fixture only. Production never imports or falls back to this store. */
import {createHash} from 'node:crypto';
export const TEST_KEY='github_pat_'+'fixture_only_'.repeat(4);
const ROOT='https://api.github.com/repos/manubaba108/opendoor';
const hash=value=>createHash('sha1').update(value).digest('hex');
export class GitHubSimulation {
  constructor(data,{released=true}={}) {
    this.refs=new Map();this.blobs=new Map();this.trees=new Map();this.commits=new Map();this.calls=[];this.failure=null;this.networkFailure=null;
    const files=new Map([['index.html',this.blob('Guest Hub release')],['assets/content.js',this.blob('window.OPENDOOR = '+JSON.stringify(data)+';')],['assets/content.json',this.blob(JSON.stringify(data))],['assets/editorial.json',this.blob('{"pending":{}}')]]);
    if(released)files.set('assets/admin-release.json',this.blob('{"version":1}'));
    const source=this.commit(this.tree(files),[],'seed');this.refs.set('guest-hub-v1',source);
    this.refs.set('main',released?source:this.commit(this.tree(new Map([['index.html',this.blob('Original redirect')]])),[],'redirect'));
    this.fetch=this.fetch.bind(this);
  }
  blob(content){const bytes=Buffer.isBuffer(content)?content:Buffer.from(content);const sha=hash(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes]));this.blobs.set(sha,bytes);return sha;}
  tree(files){const sha=hash(JSON.stringify([...files].sort()));this.trees.set(sha,new Map(files));return sha;}
  commit(tree,parents,message){const sha=hash(JSON.stringify({tree,parents,message}));this.commits.set(sha,{sha,tree:{sha:tree},parents:parents.map(sha=>({sha}))});return sha;}
  isAncestor(ancestor,head){if(ancestor===head)return true;return this.commits.get(head)?.parents.some(parent=>this.isAncestor(ancestor,parent.sha))||false;}
  files(ref){return this.trees.get(this.commits.get(this.refs.get(ref)||ref).tree.sha);}
  file(ref,path){const sha=this.files(ref).get(path);return sha?this.blobs.get(sha).toString('utf8'):null;}
  failNext(path,status=503){this.failure={path,status};}
  failNextNetwork(path,after=1){this.networkFailure={path,after};}
  async fetch(url,options={}) {
    if(!url.startsWith(ROOT))throw new Error('Unexpected repository');
    const suffix=url.slice(ROOT.length),method=options.method||'GET',body=options.body?JSON.parse(options.body):null;
    this.calls.push({url,suffix,method,body});
    const respond=(status,value)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json'}});
    if(options.headers?.Authorization!=='Bearer '+TEST_KEY)return respond(401,{message:'Bad credentials'});
    if(this.networkFailure&&suffix===this.networkFailure.path){if(--this.networkFailure.after===0){this.networkFailure=null;throw new TypeError('Failed to fetch');}}
    if(this.failure&&suffix===this.failure.path){const status=this.failure.status;this.failure=null;return respond(status,{message:'Fixture failure'});}
    if(!suffix)return respond(200,{full_name:'manubaba108/opendoor',permissions:{push:true}});
    const readRef=suffix.match(/^\/git\/ref\/heads\/(.+)$/);
    if(readRef)return this.refs.has(readRef[1])?respond(200,{ref:'refs/heads/'+readRef[1],object:{sha:this.refs.get(readRef[1])}}):respond(404,{});
    const readContent=suffix.match(/^\/contents\/(.+)\?ref=([a-f0-9]+)$/);
    if(readContent){const files=this.files(readContent[2]),sha=files.get(readContent[1]);return sha?respond(200,{encoding:'base64',content:this.blobs.get(sha).toString('base64'),sha}):respond(404,{});}
    const getCommit=suffix.match(/^\/git\/commits\/([a-f0-9]+)$/);if(getCommit)return respond(200,this.commits.get(getCommit[1]));
    const getTree=suffix.match(/^\/git\/trees\/([a-f0-9]+)\?recursive=1$/);if(getTree)return respond(200,{truncated:false,tree:[...this.trees.get(getTree[1])].map(([path,sha])=>({path,sha,mode:'100644',type:'blob'}))});
    if(method==='POST'&&suffix==='/git/blobs')return respond(201,{sha:this.blob(body.encoding==='base64'?Buffer.from(body.content,'base64'):body.content)});
    if(method==='POST'&&suffix==='/git/trees'){const files=new Map(this.trees.get(body.base_tree));for(const item of body.tree)files.set(item.path,item.sha);return respond(201,{sha:this.tree(files)});}
    if(method==='POST'&&suffix==='/git/commits')return respond(201,{sha:this.commit(body.tree,body.parents,body.message)});
    if(method==='POST'&&suffix==='/git/refs'){const name=body.ref.replace('refs/heads/','');if(this.refs.has(name))return respond(422,{});this.refs.set(name,body.sha);return respond(201,{object:{sha:body.sha}});}
    const update=suffix.match(/^\/git\/refs\/heads\/(.+)$/);
    if(update&&method==='PATCH'){
      if(body.force!==false)throw new Error('Forced write attempted');
      const current=this.refs.get(update[1]);if(!this.isAncestor(current,body.sha))return respond(422,{});
      this.refs.set(update[1],body.sha);return respond(200,{object:{sha:body.sha}});
    }
    throw new Error('Unhandled simulated endpoint: '+method+' '+suffix);
  }
}
