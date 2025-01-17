package audioBot

import (
	"watch2gether/pkg/events"
	"watch2gether/pkg/media"
	"watch2gether/pkg/user"
)

func CreateBotJoinEvent() events.Event {
	return events.Event{
		Action:  events.EVENT_USER_UPDATE,
		Watcher: user.DISCORD_BOT,
	}
}

func CreateBotUpdateEvent(seek media.Seek) events.Event {
	evt := events.Event{
		Action:  events.EVENT_USER_UPDATE,
		Watcher: user.DISCORD_BOT,
	}
	evt.Watcher.Seek = seek
	return evt
}

func CreateBotFinishEvent() events.Event {
	evt := events.Event{
		Action:  events.EVENT_FINISH,
		Watcher: user.DISCORD_BOT,
	}
	evt.Watcher.Seek = media.SEEK_FINISHED
	return evt
}

func CreateBotLeaveEvent() events.Event {
	return events.Event{
		Action:  events.EVENT_USER_LEAVE,
		Watcher: user.DISCORD_BOT,
	}
}
