import { PrismaClient, PublishStatus } from '@prisma/client'

const prisma = new PrismaClient()

const planets = [
  ['about','Origin','About',1],
  ['product','Discovery','Product',2],
  ['development','Forge','Development',3],
  ['testing','Validation','Testing',4],
  ['projects','Expedition','Projects',5],
  ['skills','Constellation','Skills',6],
  ['contact','Transmission','Contact',7],
]

async function main() {
  for (const [slug,title,subtitle,order] of planets) {
    await prisma.planet.upsert({
      where: { slug: slug as string },
      update: { title: title as string, subtitle: subtitle as string, order: order as number },
      create: {
        slug: slug as string,
        title: title as string,
        subtitle: subtitle as string,
        order: order as number,
        status: PublishStatus.PUBLISHED,
      },
    })
  }
}

main().finally(() => prisma.$disconnect())
