import React, { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { Link, Navigate } from "react-router-dom"
import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  Spoiler,
  Flex,
} from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { MdOutlineMessage } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import {CommentsModal} from "../commentsModal/CommentsModal"
import { useAuthStatus } from "../PrivateRoute"
import "./post.css"
import { showNotification } from "@mantine/notifications"
import { useNavigate } from "react-router-dom"

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}))

const Post = ({ post, id, setChat, onDelete }) => {
  const { classes } = useStyles()
  const images = [
]

  // loop throu post.imgUrls and add them to images array if they exist
  if (post.imgUrls) { 
    post.imgUrls.forEach((img) => {
      images.push(img)
    })
  }

  const [opened, setOpened] = useState(false)
  const {loggedIn, checkingStatus} = useAuthStatus()
  const navigate = useNavigate()

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ))
  return (
    <div>
      <Card radius='md' withBorder p='xl' className='card'>
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
        </Card.Section>
        <div>
          <Group position='apart' mt='lg'>
            <Text weight={500} size='md'>
              {post.category}
            </Text>

            <Group spacing={5}>
              <Text size='sm' weight={500}>
                {post.price ? post.price: 200} €
              </Text>
            </Group>
          </Group>

          <Text size='sm' color='dimmed' mt='sm' mih={80}>
            <Spoiler
              maxHeight={60}
              showLabel='Show More'
              hideLabel='Hide'
              transitionDuration={140}
            >
              {post.text}
            </Spoiler>
          </Text>
        </div>

        <div className='postButtons'>
          <Group position='apart' mt='md'>
            <div>
              <Text size='md' span weight={400} className={classes.price}>
                {post.ime}
              </Text>
              <Text span size='sm' color='dimmed'>
                {" "}
              </Text>
            </div>
            <Flex align='center' gap={16}>
              {loggedIn?  <MdOutlineMessage className='messageIcon' onClick={() => setOpened(true)} /> : <MdOutlineMessage className="messageIcon gray" onClick={() => navigate("/sign-in")}/>
              }
             
              <Link to='/messenger' className="messageIcon">
                <IoMdSend className='' />
              </Link>
              {onDelete && (
                <FaTrashAlt className="deleteIcon" onClick={() => onDelete(post.id, post.name)}/>
              )}
            </Flex>
          </Group>
        </div>
      </Card>
      {
        loggedIn?  <CommentsModal opened={opened} setOpened={setOpened} postId={id}/> : null
      }
     
    </div>
  )
}

export default Post
