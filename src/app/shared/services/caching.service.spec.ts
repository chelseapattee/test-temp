import { TestBed } from '@angular/core/testing';
import { CachingService } from './caching.service';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachingService);
  });

  it('should store and retrieve data', () => {
    const testData = { id: 1, name: 'test' };
    service.set('test-key', testData);
    expect(service.get('test-key')).toEqual(testData);
  });

  it('should return null for expired data', (done) => {
    const testData = { id: 1, name: 'test' };
    service.set('test-key', testData, 100); // 100ms TTL

    setTimeout(() => {
      expect(service.get('test-key')).toBeNull();
      done();
    }, 200);
  });

  it('should clear all cached data', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    service.clear();
    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
  });

  it('should remove specific cached item', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    service.remove('key1');
    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toEqual('value2');
  });
});