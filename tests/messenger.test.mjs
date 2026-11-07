import {test} from 'node:test';
import assert from 'node:assert/strict';
import {messengerUrl,DEFAULT_MESSENGER_URL} from '../lib/messenger.ts';

test('converts the supplied Facebook Page and numeric profiles to Messenger',()=>{
 assert.equal(messengerUrl('https://www.facebook.com/HarveyJettt/'),DEFAULT_MESSENGER_URL);
 assert.equal(messengerUrl(' https://m.me/HarveyJettt?ref=website '),DEFAULT_MESSENGER_URL);
 assert.equal(messengerUrl('https://facebook.com/profile.php?id=12345'),'https://m.me/12345');
});
test('rejects unsafe URLs and unsupported Facebook destinations',()=>{
 for(const url of ['javascript:alert(1)','http://m.me/Page','https://m.me.evil.test/Page','https://evil.test','https://user:password@m.me/Page','https://facebook.com/groups/123','https://facebook.com/share/abc','https://facebook.com/login','https://m.me/Page/other','https://m.me:444/Page'])assert.equal(messengerUrl(url),null,url);
});
test('an empty or absent setting does not yield a chat destination',()=>{
 for(const url of ['',undefined,'  ','broken'])assert.equal(messengerUrl(url),null);
});
