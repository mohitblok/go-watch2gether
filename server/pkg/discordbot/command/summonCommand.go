package command

import (
	"fmt"
	"strings"
	"watch2gether/pkg/events"
	"watch2gether/pkg/user"
)

func init() {
	Commands["summon"] = &SummonCmd{BaseCommand{"Plays the summon playlist"}}
}

type SummonCmd struct{ BaseCommand }

func (cmd *SummonCmd) Execute(ctx CommandCtx) error {
	r, ok := ctx.GetHubRoom()
	meta, err := ctx.GetMeta()
	if !ok && err != nil {
		return fmt.Errorf("room %s not active", ctx.Guild.ID)
	}

	playlists, err := ctx.Playlist.FindByField("RoomID", ctx.Guild.ID)
	if err != nil {
		return fmt.Errorf("Unable to find playlists for the room")
	}

	//Get Username from discord message
	usrID := ctx.Args[0]
	usrID = strings.Trim(usrID, ">")
	usrID = strings.Trim(usrID, "<@!")
	usr, err := ctx.Session.User(usrID)
	fmt.Println(ctx.Args)
	if err != nil {
		return fmt.Errorf("unable to find user: %w", err)
	}
	playlistName := "@" + usr.Username
	for _, playlist := range playlists {
		if strings.EqualFold(strings.TrimSuffix(playlist.Name, " "), playlistName) {
			queue := meta.Queue
			queue = append(queue, playlist.Videos...)
			r.HandleEvent(events.Event{
				Action:  events.EVNT_UPDATE_QUEUE,
				Watcher: user.DISCORD_BOT,
				Queue:   queue,
			})
			return ctx.Reply(fmt.Sprintf("Playing playlist for: %s", ctx.Args[0]))
		}
	}
	return ctx.Reply(fmt.Sprintf("Could not find playlist to use to summon '%s'", playlistName))
}
