// Rolling Buffer Architecture Service for Optimized Action Clip Mode

export class BufferManager {
  private isBuffering: boolean = false;
  private bufferWindowSeconds: number = 60;
  private bufferBeforeSeconds: number = 20;
  private bufferAfterSeconds: number = 20;
  private bufferChunks: { timestamp: number; uri: string }[] = [];

  constructor(beforeSec = 20, afterSec = 20) {
    this.bufferBeforeSeconds = beforeSec;
    this.bufferAfterSeconds = afterSec;
    this.bufferWindowSeconds = beforeSec + afterSec + 20;
  }

  public setConfig(beforeSec: number, afterSec: number) {
    this.bufferBeforeSeconds = beforeSec;
    this.bufferAfterSeconds = afterSec;
    this.bufferWindowSeconds = beforeSec + afterSec + 20;
  }

  public startBuffering() {
    this.isBuffering = true;
    this.bufferChunks = [];
  }

  public stopBuffering() {
    this.isBuffering = false;
    this.bufferChunks = [];
  }

  public pushChunk(chunkUri: string) {
    if (!this.isBuffering) return;
    const now = Date.now();
    this.bufferChunks.push({ timestamp: now, uri: chunkUri });

    // Evict chunks older than buffer window
    const cutoff = now - this.bufferWindowSeconds * 1000;
    this.bufferChunks = this.bufferChunks.filter((c) => c.timestamp >= cutoff);
  }

  public captureEventClip(eventId: string, callback?: (clipUri: string) => void): { beforeSec: number; afterSec: number; eventId: string } {
    const activeChunks = [...this.bufferChunks];
    // Simulates capturing the rolling window clip around event timestamp
    const simulatedClipUri = `file:///app/storage/clips/${eventId}_clip.mp4`;
    if (callback) {
      setTimeout(() => callback(simulatedClipUri), 500);
    }
    return {
      beforeSec: this.bufferBeforeSeconds,
      afterSec: this.bufferAfterSeconds,
      eventId,
    };
  }

  public getStatus() {
    return {
      isBuffering: this.isBuffering,
      bufferedChunksCount: this.bufferChunks.length,
      beforeSec: this.bufferBeforeSeconds,
      afterSec: this.bufferAfterSeconds,
    };
  }
}

export const bufferManager = new BufferManager();
