-- CreateTable
CREATE TABLE "YouTubeChannel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelName" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeChannel_channelId_key" ON "YouTubeChannel"("channelId");
